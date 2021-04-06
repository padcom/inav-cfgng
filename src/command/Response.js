import { Logger } from '../logger'
import { getObjectPropertyNames, readonly, hex } from '../utils'

export class Response {
  #log = Logger.getLogger('RESPONSE')

  constructor(protocol, buffer) {
    this.#log.trace(`Created ${this.constructor.name}`)

    const decoded = protocol.decode(buffer)
    Object.keys(decoded).forEach(key => {
      readonly(this, key, decoded[key])
    })
  }

  toString() {
    const protocol = this.protocol.constructor.PROTOCOL_ID
    const protocolName = this.protocol.constructor.PROTOCOL_NAME
    const command = this.command
    const plLen = this.payload.byteLength
    const properties = this.getToStringContent()

    const parts = [
      this.constructor.name,
      `(direction: ${this.direction}, protocol: ${hex(protocol, 4)}/${protocolName}, command: ${hex(command, 4)}/${command}, payload: ${plLen} bytes)`,
      properties
    ]

    return parts.join(' ')
  }

  getToStringContent() {
    const content = getObjectPropertyNames(this)
      .map(prop => `  ${prop} = ${JSON.stringify(this[prop])}`)
      .join('\n')

    if (content !== '') return `{\n${content}\n}`
    else return ''
  }

  getBool8(offset, ...args) {
    return this.payload.byteLength - 1 >= offset ? Boolean(this.payload.getUint8(offset, ...args)) : undefined
  }

  getBool16(offset, ...args) {
    return this.payload.byteLength - 1 >= offset ? Boolean(this.payload.getUint16(offset, ...args)) : undefined
  }

  getBool32(offset, ...args) {
    return this.payload.byteLength - 1 >= offset ? Boolean(this.payload.getUint32(offset, ...args)) : undefined
  }

  getInt8(offset, ...args) {
    return this.payload.byteLength - 1 >= offset ? this.payload.getInt8(offset, ...args) : undefined
  }

  getUint8(offset, ...args) {
    return this.payload.byteLength - 1 >= offset ? this.payload.getUint8(offset, ...args) : undefined
  }

  getInt16(offset, ...args) {
    return this.payload.byteLength - 2 >= offset ? this.payload.getInt16(offset, ...args) : undefined
  }

  getUint16(offset, ...args) {
    return this.payload.byteLength - 2 >= offset ? this.payload.getUint16(offset, ...args) : undefined
  }

  getInt32(offset, ...args) {
    return this.payload.byteLength - 4 >= offset ? this.payload.getInt32(offset, ...args) : undefined
  }

  getUint32(offset, ...args) {
    return this.payload.byteLength - 4 >= offset ? this.payload.getUint32(offset, ...args) : undefined
  }

  getFloat32(offset, ...args) {
    return this.payload.byteLength - 4 >= offset ? this.payload.getFloat32(offset, ...args) : undefined
  }

  getFloat64(offset, ...args) {
    return this.payload.byteLength - 4 >= offset ? this.payload.getFloat64(offset, ...args) : undefined
  }

  getUint8Array(offset, maxLength = this.payload.byteLength) {
    const last = Math.min(offset + maxLength, this.payload.byteLength)
    const result = []
    for (let i = offset; i < last; i++) {
      result.push(this.payload.getUint8(i))
    }
    return result
  }

  getString(offset, maxLength = this.payload.byteLength) {
    const last = Math.min(offset + maxLength, this.payload.byteLength)
    let result = ''
    for (let i = offset; i < last; i++) {
      const char = this.payload.getUint8(i)
      if (!char) break
      result += String.fromCharCode(char)
    }
    return result
  }
}
