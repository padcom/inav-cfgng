import EventEmitter from 'eventemitter2'
import ipc from './ipc'
import { Logger } from './logger'
import { hex, waitForSingleEvent } from './utils'
import { registry } from './registry'
import { MSP } from './protocol/MSP'
import { MSPv1 } from './protocol/MSPv1'
import { MSPv2 } from './protocol/MSPv2'

export class Serial extends EventEmitter {
  static MSPv1 = new MSPv1()
  static MSPv2 = new MSPv2()

  #log = Logger.getLogger('SERIAL')
  #protocol = Serial.MSPv1
  #path = null
  #isDestroyed = false
  #buffer = Buffer.from([])

  constructor(...args) {
    super(...args)
    ipc.on('serial.open', this.#openHandler)
    ipc.on('serial.close', this.#closeHandler)
    ipc.on('serial.error', this.#errorHandler)
    ipc.on('serial.data', this.#dataHandler)
    this.on('data', this.#packetHandler)
  }

  resetProtocolToMSPv1() {
    this.#protocol = Serial.MSPv1
  }

  upgradeProtocolToMSPv2() {
    this.#protocol = Serial.MSPv2
  }

  destroy() {
    this.#isDestroyed = true
    ipc.off('serial.data', this.#dataHandler)
    ipc.off('serial.open', this.#openHandler)
    ipc.off('serial.close', this.#closeHandler)
    ipc.off('serial.error', this.#errorHandler)
    this.off('data', this.#packetHandler)
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
    this.emit('err', path, error)
  }

  #dataHandler = async (sender, path, buffer) => {
    this.#buffer = Buffer.concat([ this.#buffer, buffer ])
    this.emit('buffer', this.#buffer)
    const protocol = this.#decodeProtocol(this.#buffer)
    const ProtocolClass = protocol.constructor
    const expectedPacketLength = ProtocolClass.decodeExpectedPacketLength(this.#buffer)
    if (expectedPacketLength > 65530) {
      this.#log.error('Invalid expected packet length', expectedPacketLength)
      this.#buffer = Buffer.from([])
    }
    if (this.#buffer.byteLength >= expectedPacketLength) {
      const buffer = this.#buffer.slice(0, expectedPacketLength)
      this.emit('data', sender, path, buffer)
      this.#buffer = this.#buffer.slice(expectedPacketLength)
      this.emit('buffer', this.#buffer)
    }
  }

  #packetHandler = async (sender, path, buffer) => {
    const protocol = this.#decodeProtocol(buffer)
    const ProtocolClass = protocol.constructor
    const code = ProtocolClass.decodeCommandCode(buffer)
    const { response: ResponseClass } = await registry.getCommandByCode(code)
    const response = new ResponseClass(new ProtocolClass(), buffer)
    this.emit('packet', path, response)
  }

  #decodeProtocol(buffer) {
    const code = MSP.decodeProtocolCode(buffer)
    if (code === MSPv1.PROTOCOL_ID) {
      return Serial.MSPv1
    } else if (code === MSPv2.PROTOCOL_ID) {
      return Serial.MSPv2
    } else {
      this.#log.error('Unknown protocol', hex(code))
      this.#buffer = Buffer.from([])
      throw new Error('Unknown protocol', code)
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
    const [ , , result ] = await waitForSingleEvent(ipc, 'serial.exists')
    return result
  }

  async isOpen (path) {
    ipc.send('serial.is-open', path)
    const [ , , result ] = await waitForSingleEvent(ipc, 'serial.is-open')
    return result
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

  async send(request, timeout = 1000) {
    const buffer = this.#protocol.encode(MSP.DIRECTION_TO_MSC, request.command, request.payload)
    ipc.send('serial.write', this.#path, buffer)

    const result = await waitForSingleEvent(ipc, 'serial.write-completed', timeout)
    if (result.error) throw new Error(result.error)

    return true
  }

  async query(request, timeout = 1000) {
    if (this.#isDestroyed) throw new Error('Serial is destroyed')

    await this.#beginQuery()

    try {
      for (let i = 10; i >= 0; i--) {
        await this.send(request, timeout / 4)
        try {
          const [ , response ] = await waitForSingleEvent(this, 'packet', timeout)
          if (request.command === response.command) {
            this.#log.debug('Received response', response)
            return response
          } else {
            this.#log.warn('Received response to different packet - retrying', response)
            continue
          }
        } catch (e) {
          if (e.message !== 'Timeout') throw e
          if (i === 0) throw e
        }
      }
    } finally {
      this.#endQuery()
    }
  }

  #isWaitingForResponse = false

  async #beginQuery() {
    this.#log.trace('Begin query')
    await this.#waitForReadyToSend()
    this.#isWaitingForResponse = true
  }

  async #endQuery() {
    this.#log.trace('End query')
    this.#isWaitingForResponse = false
  }

  async #waitForReadyToSend() {
    if (!this.#isWaitingForResponse) {
      return true
    } else {
      return new Promise(resolve => {
        const timer = setInterval(() => {
          if (!this.#isWaitingForResponse) {
            clearInterval(timer)
            resolve(true)
          }
        }, 10)
      })
    }
  }
}
