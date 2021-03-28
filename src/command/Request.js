import { Logger } from '../logger'
import { hex } from '../utils'

export class Request {
  #log = Logger.getLogger('REQUEST')

  constructor(command) {
    this.#log.trace(`Created ${this.constructor.name}`)

    this.command = command
  }

  get payload() {
    return []
  }

  toString() {
    const payload = this.payload.length > 0 ? `, payload: ${this.payload.length}` : ''
    const parts = [
      this.constructor.name,
      `(command: ${hex(this.command, 4)}/${this.command}${payload})`
    ]
    if (this.payload.length > 0) {
      parts.push(`{\n  ${JSON.stringify(this.payload)}\n}`)
    }
    return parts.join(' ')
  }
}
