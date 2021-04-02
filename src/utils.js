import EventEmitter from 'eventemitter2'
import { Logger } from './logger'

const log = Logger.getLogger('UTILS')

export function constrain(input, min, max) {
  return Math.max(Math.min(input, max), min)
}

export function getObjectPropertyNames(obj) {
  return Object
    .getOwnPropertyNames(Object.getPrototypeOf(obj))
    .filter(prop => typeof obj[prop] !== 'function')
}

export function getKeyForValue(obj, value) {
  return Object.entries(obj).find(([k, v]) => v === value)
}

export function getByteAtOffset(buffer, offset) {
  if (buffer instanceof Buffer) return buffer[offset]
  else if (buffer instanceof Uint8Array) return buffer[offset]
  else if (buffer instanceof DataView) return buffer.getUint8(offset)
  else throw new Error('Don\'t know how to get data from', buffer.constructor)
}

export function readonly(object, field, value) {
  log.trace(`Defining readonly property ${field} with value ${JSON.stringify(value)}`)

  Object.defineProperty(object, field, {
    get() { return value }
  })
}

export function hex(n, width = 2, prefix = '0x') {
  return `${prefix}${('0'.repeat(width) + n.toString(16)).substr(-width)}`
}

export function sleep(ms) {
  log.trace(`Sleeping for ${ms}ms`)

  return new Promise(resolve => { setTimeout(resolve, ms) })
}

export function bitCheck(num, bit) {
  return (num >> bit) % 2 != 0
}

export function switchKeyValues(obj) {
  return Object
    .keys(obj)
    .reduce((acc, field, index) => ({ ...acc, [obj[field]]: field }), {})
}

export function runWithTimeout(interval, timeout, cb, finish = () => {}) {
  log.trace(`Running callback with timeout ${timeout}ms and retry interval ${interval}`)

  return new Promise(async (resolve, reject) => {
    const timer = setTimeout(() => {
      cleanup()
      reject(new Error('Timeout'))
    }, timeout)

    const body = async () => {
      const result = await cb()
      if (result) {
        cleanup()
        resolve(result)
      }
    }

    const worker = timeout === interval ? 0 : setInterval(body, interval)
    await body()

    function cleanup() {
      finish()
      clearTimeout(timer)
      clearInterval(worker)
    }
  })
}

export async function waitForSingleEvent(emitter, event, timeout = 1000) {
  log.trace(`Waiting for event ${event} for ${timeout}ms`)

  return new Promise((resolve, reject) => {
    let cleanup

    const timer = setTimeout(() => {
      cleanup()
      log.debug(`Timeout when for event ${event}`)
      reject(new Error(`Timeout waiting for event ${event}`))
    }, timeout)

    const handler = (...args) => {
      log.trace(`Event ${event} received`)
      cleanup()
      if (args.length === 0) resolve(true)
      else if (args.length === 1) resolve(args[0])
      else resolve(args)
    }

    cleanup = () => {
      emitter.off(event, handler)
      clearTimeout(timer)
    }

    try {
      emitter.once(event, handler)
    } catch (e) {
      cleanup()
      reject(e)
    }
  })
}

export class Timer extends EventEmitter {
  #log = Logger.getLogger('TIMER')
  #timer = null
  #timeout = null

  start(ms) {
    this.#log.trace(`Starting timer for ${ms}ms`)
    this.#timeout = ms
    this.#timer = setTimeout(this.#handler, this.#timeout)
    this.#log.trace(`Timer ${this.#timer} started`)
    return this
  }

  stop() {
    if (this.#timer) {
      this.#log.trace(`Stopping timer ${this.#timer}`)
      clearTimeout(this.#timer)
      this.#timer = null
      this.#timeout = null
    }
    return this
  }

  reset() {
    if (this.#timer) {
      this.#log.trace(`Resetting timer ${this.#timer} for ${this.#timeout}ms`)
      clearTimeout(this.#timer)
      this.#timer = setTimeout(this.#handler, this.#timeout)
      this.#log.trace(`Timer ${this.#timer} started`)
    }
    return this
  }

  #handler = () => {
    this.#log.trace(`Timer ${this.#timer} expired`)
    clearTimeout(this.#timer)
    this.#timer = null
    this.#timeout = null
    this.emit('done')
  }
}
