import { v4 as uuid } from 'uuid'
import { Logger } from './logger'

export class TaskScheduler {
  #log = Logger.getLogger('SCHEDULER')
  #serial = null
  #timer = null
  #index = 0
  #tasks = new Map()
  #busy = false
  #paused = false

  constructor(serial) {
    this.#serial = serial
    this.#serial.on('ready', this.#start)
    this.#serial.on('close', this.#stop)
  }

  destroy() {
    this.#serial.off('ready', this.#start)
    this.#serial.off('close', this.#stop)
  }

  enqueue(priority, request, handler = null) {
    if (!priority) throw new Error('Invalid proprity', priority)
    if (!handler) throw new Error('Invalid handler')
    if (!request) throw new Error('Invalid request')

    const id = uuid()
    this.#tasks.set(id, { priority, request, handler })
    this.#log.debug('Enqueued', request, 'with priority', priority)

    return id
  }

  dequeue(id) {
    if (this.#tasks.has(id)) {
      this.#tasks.delete(id)
      this.#log.debug('Dequeued task', id)
    } else {
      this.#log.warn('Task with id', id, 'not scheduled')
    }
  }

  async pause() {
    this.#log.debug('Pause')
    await this.#waitForNotBusy()
    this.#paused = true
  }

  async resume() {
    this.#log.debug('Resume')
    this.#paused = false
  }

  #start = () => {
    this.#timer = setInterval(this.#loop, 10)
    this.#log.info('Started')
  }

  #stop = () => {
    clearInterval(this.#timer)
    this.#log.info('Stopped')
  }

  async #waitForNotBusy() {
    if (!this.#busy) {
      return true
    } else {
      return new Promise(resolve => {
        const timer = setInterval(() => {
          if (!this.#busy) {
            clearInterval(timer)
            resolve()
          }
        }, 0)
      })
    }
  }

  #loop = async () => {
    if (this.#busy) return
    if (this.#paused) return

    this.#busy = true
    try {
      this.#index++
      for (let [ id, { priority, request, handler } ] of this.#tasks) {
        if (this.#index % priority === 0) {
          try {
            const response = await this.#serial.query(request)
            handler(response)
          } catch (e) {
            this.#log.warn('Unable to perform scheduled task', request, ':', e, '- skipping')
          }
        }
      }
    } finally {
      this.#busy = false
    }
  }
}
