import EventEmitter from 'eventemitter2'

export class MSP extends EventEmitter {
  static get START_BYTE() {
    return '$'.charCodeAt(0)
  }

  static get DIRECTION_FROM_MSC() {
    return '>'.charCodeAt(0)
  }

  static get DIRECTION_TO_MSC() {
    return '<'.charCodeAt(0)
  }

  static get UNSUPPORTED() {
    return '!'.charCodeAt(0)
  }

  static decodeStartCode = function(buffer) {
    return buffer[0]
  }

  static decodeDirectionCode = function(buffer) {
    if (buffer instanceof Buffer) return buffer[2]
    else if (buffer instanceof Uint8Array) return buffer[2]
    else if (buffer instanceof DataView) return buffer.getUint8(2)
    else throw new Error('Don\'t know how to read direction code from', buffer.toString())
  }

  static decodeProtocolCode = function(buffer) {
    if (buffer instanceof Buffer) return buffer[1]
    else if (buffer instanceof Uint8Array) return buffer[1]
    else if (buffer instanceof DataView) return buffer.getUint8(1)
    else throw new Error('Don\'t know how to read protocol code from', buffer.toString())
  }

  decode(buffer) {
    throw new Error('Packet class is abstract and does not implement the "decode" method. Use protocol-specific packet class instead.')
  }
  
  encode(direction, command, payload) {
    throw new Error('Packet class is abstract and does not implement the "encode" method. Use protocol-specific packet class instead.')
  }
}
