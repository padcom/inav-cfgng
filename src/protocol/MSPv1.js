import { Logger } from '../logger'
import { MSP } from './MSP'
import { hex, getByteAtOffset } from '../utils'

export class MSPv1 extends MSP {
  #log = Logger.getLogger('MSPV1')

  static get PROTOCOL_ID() {
    return 'M'.charCodeAt(0)
  }

  static get PROTOCOL_NAME() {
    return 'MSPv1'
  }

  static decodeCommandCode(buffer) {
    return getByteAtOffset(buffer, 4)
  }
  
  static decodePayloadOffset(buffer) {
    return getByteAtOffset(buffer, 3) === 0xFF ? 7 : 5
    }
  
  static decodePayloadLength(buffer) {
    if (getByteAtOffset(buffer, 3) !== 0xFF) {
      return getByteAtOffset(buffer, 3)
    } else {
      return getByteAtOffset(buffer, 5) | (getByteAtOffset(buffer, 6) << 8)
    }
  }
  
  static decodeExpectedPacketLength(buffer) {
    return MSPv1.decodePayloadLength(buffer) + MSPv1.decodePayloadOffset(buffer) + 1 // crc at the end
  }

  decode(buffer) {
    this.#log.trace(`Decoding; Buffer length ${buffer.byteLength}`)
    this.#log.trace(buffer)
    this.emit('decoding', buffer)

    const begin = MSP.decodeStartCode(buffer)
    if (begin !== MSP.START_BYTE) {
      throw new Error(`Invalid start byte ${hex(buffer[0])}`)
    }

    const version = MSP.decodeProtocolCode(buffer)
    if (version !== MSPv1.PROTOCOL_ID) {
      throw new Error('Packet is not MSP v1')
    }

    const direction = this.#getDirection(buffer)
    const command = this.#getCommand(buffer)
    const payload = this.#getPayload(buffer)
    const crc = this.#getCRC(buffer)
    const calculatedCRC = this.#checksum(buffer)

    if (crc !== calculatedCRC) {
      throw new Error(`Invalid CRC: got ${hex(crc)} expected ${hex(calculatedCRC)}`)
    }

    this.#log.debug(`Decoded command with id ${command}, payload size: ${payload.byteLength}`)
    this.emit('decoded', { buffer, direction, command, payload })

    return {
      buffer: this.#getBufferDataView(buffer),
      protocol: this,
      direction,
      command,
      payload
    }
  }

  encode(direction, command, payload) {
    this.#log.debug(`Encoding command ${hex(command)}/${command} with payload length ${payload.length}`)
    this.emit('encoding', { direction, command, payload })

    const payloadLength = payload && payload.length ? payload.length : 0;
    const length = payloadLength + 6;
    const view = new Uint8Array(length);
    view[0] = MSP.START_BYTE;
    view[1] = MSPv1.PROTOCOL_ID
    view[2] = direction;
    view[3] = payloadLength;
    view[4] = command;
    for (let i = 0; i < payloadLength; i++) {
        view[i + 5] = payload[i];
    }
    view[length-1] = this.#checksum(view);

    const buffer = Buffer.from(view)

    this.#log.trace('Encoded buffer', buffer)
    this.emit('encoded', buffer)

    return buffer
  }

  #getCommand(buffer) {
    return buffer[4]
  }

  #getDirection(buffer) {
    return String.fromCharCode(buffer[2])
  }

  #getBufferDataView(buffer) {
    return new DataView(new Uint8Array(buffer).buffer)
  }

  #getPayload(buffer) {
    return new DataView(new Uint8Array(buffer).buffer, MSPv1.decodePayloadOffset(buffer), MSPv1.decodePayloadLength(buffer))
  }

  #getCRC(buffer) {
    return buffer[buffer.length - 1]    
  }

  #checksum(buffer) {
    let checksum = buffer[3]
    for (let i = 4; i < buffer.length - 1; i++) {
      checksum ^= buffer[i];
    }

    return checksum;
  }
}

