import EventEmitter from 'eventemitter2'
import ipc from './ipc'
import { waitForSingleEvent } from './utils'
import { registry } from './registry'
import { MSP } from './protocol/MSP'
import { MSPv1 } from './protocol/MSPv1'
import { MSPv2 } from './protocol/MSPv2'

export class Serial extends EventEmitter {
  static MSPv1 = new MSPv1()
  static MSPv2 = new MSPv2()
  protocol = Serial.MSPv1
  #path = null
  #isDestroyed = false
  #buffer = Buffer.from([])

  constructor(...args) {
    super(...args)
    ipc.on('serial.open', this.#openHandler)
    ipc.on('serial.close', this.#closeHandler)
    ipc.on('serial.error', this.#errorHandler)
    ipc.on('serial.data', this.#dataHandler)
  }

  destroy() {
    this.#isDestroyed = true
    ipc.off('serial.data', this.#dataHandler)
    ipc.off('serial.open', this.#openHandler)
    ipc.off('serial.close', this.#closeHandler)
    ipc.off('serial.error', this.#errorHandler)
  }

  #openHandler = (sender, path) => {
    this.#path = path
    this.emit('open', path)
  }

  #closeHandler = (sender, path) => {
    this.#path = null
    this.#buffer = Buffer.from([])
    this.emit('close', path)
  }

  #errorHandler = (sender, path, error) => {
    this.emit('error', path, error)
  }

  #dataHandler = async (sender, path, buffer) => {
    this.#buffer = Buffer.concat([ this.#buffer, buffer ])
    const ProtocolClass = this.#decodeProtocolClass(this.#buffer)
    const expectedPacketLength = ProtocolClass.decodeExpectedPacketLength(this.#buffer)
    if (expectedPacketLength >= this.#buffer.byteLength) {
      const code = ProtocolClass.decodeCommandCode(this.#buffer)
      const { response: ResponseClass } = await registry.getCommandByCode(code)
      const response = new ResponseClass(new ProtocolClass(), this.#buffer)
      this.emit('data', path, response)
      this.#buffer = this.#buffer.slice(expectedPacketLength)
    }
  }

  #decodeProtocolClass(buffer) {
    if (MSP.decodeProtocolCode(buffer) === MSPv1.PROTOCOL_ID) {
      return MSPv1
    } else if (MSP.decodeProtocolCode(buffer) === MSPv2.PROTOCOL_ID) {
      return MSPv2
    } else {
      throw new Error('Unknown protocol')
    }
  }

  async cleanup() {
    ipc.send('serial.close-all')
  }

  async list() {
    ipc.send('serial.list')
    const [ , ports ] = await waitForSingleEvent(ipc, 'serial.listed')
    return ports
  }

  async exists (path) {
    ipc.send('serial.exists', path)
    const [ , exists ] = await waitForSingleEvent('serial.exists')
    return exists
  }

  async isOpen (path) {
    ipc.send('serial.is-open', path)
    const [ , isOpen ] = await waitForSingleEvent('serial.is-open')
    return isOpen
  }

  async open(path) {
    if (this.#isDestroyed) throw new Error('Serial is destroyed')
    this.#path = path
    ipc.send('serial.open', this.#path)
  }

  async close() {
    if (this.#isDestroyed) throw new Error('Serial is destroyed')
    ipc.send('serial.close', this.#path)
  }

  async write(buffer) {
    if (this.#isDestroyed) throw new Error('Serial is destroyed')
    ipc.send('serial.write', this.#path, buffer)
  }

  async send(request) {
    const { code } = await registry.getCommandByCode(request.command)
    const buffer = this.protocol.encode(MSP.DIRECTION_TO_MSC, code, request.payload)
    return this.write(buffer)
  }

  async query(request, timeout = 1000, retries = 10) {
    await this.send(request)
    for (let i = retries; i >= 0; i--) {
      try {
        const [ , response ] = await waitForSingleEvent(this, 'data', timeout)
        return response
      } catch (e) {
        if (e.message !== 'Timeout' || i === 0) {
          throw e
        }
      }
    }
  }
}
