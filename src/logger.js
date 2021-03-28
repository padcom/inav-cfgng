import EventEmitter from 'eventemitter2'

export const LogLevel = Object.freeze({
  trace: 0,
  debug: 1,
  info : 2,
  warn : 3,
  error: 4
})

export class Logger {
  static #loggers = new Map()
  static #events = new EventEmitter()

  static get events() {
    return Logger.#events
  }

  /** @return {Logger} logger */
  static getLogger(name) {
    name = name.toUpperCase()
    if (!Logger.#loggers.has(name)) {
      Logger.#loggers.set(name, new Logger(name))
    }
    return Logger.#loggers.get(name)
  }

  #name = 'DEFAULT'
  #level = LogLevel.debug

  constructor(name, level = LogLevel.info) {
    this.#name = name
    this.#level = level
  }

  set level(value) {
    this.#level = value
  }

  trace(...args) {
    if (this.#level <= LogLevel.trace)
      Logger.#events.emit('trace', { source: this.#name, args })
  }

  debug(...args) {
    if (this.#level <= LogLevel.debug)
      Logger.#events.emit('debug', { source: this.#name, args })
  }

  info(...args) {
    if (this.#level <= LogLevel.info)
      Logger.#events.emit('info', { source: this.#name, args })
  }

  warn(...args) {
    if (this.#level <= LogLevel.warn)
      Logger.#events.emit('warn', { source: this.#name, args })
  }

  error(...args) {
    if (this.#level <= LogLevel.error)
      Logger.#events.emit('error', { source: this.#name, args })
  }
}
