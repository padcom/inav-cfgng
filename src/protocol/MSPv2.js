import { MSP } from './MSP'
import { hex, getByteAtOffset } from '../utils'
import { Logger } from '../logger'

export class MSPv2 extends MSP {
  #log = Logger.getLogger('MSPV2')

  static get PROTOCOL_ID() { 
    return 'X'.charCodeAt(0)
  }

  static get PROTOCOL_NAME() { 
    return 'MSPv2'
  }

  
  static decodeCommandCode(buffer) {
    return getByteAtOffset(buffer, 4) | (getByteAtOffset(buffer, 5) << 8)
  }
  
  static decodePayloadOffset(buffer) {
    return 8
  }
  
  static decodePayloadLength(buffer) {
    return getByteAtOffset(buffer, 6) | (getByteAtOffset(buffer, 7) << 8)
  }
  
  static decodeExpectedPacketLength(buffer) {
    return MSPv2.decodePayloadLength(buffer) + MSPv2.decodePayloadOffset(buffer) + 1 // crc at the end
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
    if (version !== MSPv2.PROTOCOL_ID) {
      throw new Error('Packet is not MSPv2')
    }

    const direction = this.#getDirection(buffer)
    const flags = this.#getFlags(buffer)
    const command = this.#getCommand(buffer)
    const payload = this.#getPayload(buffer)
    const crc = this.#getCRC(buffer)
    const calculatedCRC = this.#checksum(command, flags, payload, payload.byteLength)

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

  encode(direction, command, payload = []) {
    this.#log.debug(`Encoding command ${hex(command, 4)}/${command} with payload length ${payload.length}`)
    this.emit('encoding', { direction, command, payload })

    payload = payload ? payload.toDataView() : new DataView(new ArrayBuffer(0))
    const length = payload.byteLength + 9
    const view = new Uint8Array(length)
    view[0] = MSP.START_BYTE
    view[1] = MSPv2.PROTOCOL_ID
    view[2] = direction
    view[3] = 0;                            // flag: reserved, set to 0
    view[4] = command & 0xFF                // code lower byte
    view[5] = (command & 0xFF00) >> 8       // code upper byte
    view[6] = payload.byteLength & 0xFF          // payloadLength lower byte
    view[7] = (payload.byteLength & 0xFF00) >> 8 // payloadLength upper byte

    for (let i = 0; i < payload.byteLength; i++) {
      view[MSPv2.decodePayloadOffset() + i] = payload.getUint8(i)
    }
    view[length - 1] = this.#checksum(command, 0, payload, payload.byteLength)

    const buffer = Buffer.from(view)

    this.#log.trace('Encoded buffer', buffer)
    this.emit('encoded', buffer)

    return buffer
  }

  #checksum(command, flags, payload, payloadLength) {
    let checksum = 0
    checksum = this.#crc8_dvb_s2(checksum, flags)
    checksum = this.#crc8_dvb_s2(checksum, command & 0xFF)
    checksum = this.#crc8_dvb_s2(checksum, (command & 0xFF00) >> 8)
    checksum = this.#crc8_dvb_s2(checksum, payloadLength & 0xFF)
    checksum = this.#crc8_dvb_s2(checksum, (payloadLength & 0xFF00) >> 8)
    for (let i = 0; i < payloadLength; i++) {
      checksum = this.#crc8_dvb_s2(checksum, payload.getUint8(i))
    }
    return checksum
  }

  #crc8_dvb_s2(crc, ch) {
    crc ^= ch;
    for (let i = 0; i < 8; ++i) {
      if (crc & 0x80) {
        crc = ((crc << 1) & 0xFF) ^ 0xD5;
      } else {
        crc = (crc << 1) & 0xFF;
      }
    }
    return crc;
  }

  #getDirection(buffer) {
    return String.fromCharCode(buffer[2])
  }

  #getFlags(buffer) {
    return buffer[3]
  }

  #getCommand(buffer) {
    return buffer[4] | (buffer[5] << 8)
  }

  #getBufferDataView(buffer) {
    return new DataView(new Uint8Array(buffer).buffer)
  }

  #getPayload(buffer) {
    return new DataView(new Uint8Array(buffer).buffer, MSPv2.decodePayloadOffset(buffer), MSPv2.decodePayloadLength(buffer))
  }

  #getCRC(buffer) {
    return buffer[buffer.length - 1]    
  }
}
