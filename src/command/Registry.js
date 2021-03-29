import { Logger } from '../logger'
import { hex } from '../utils'
import { UnknownResponse } from './Unknown'

export class Registry {
  #log = Logger.getLogger('REGISTRY')
  #commands = new Map()

  async register(command, code, request, response) {
    if (this.#commands.has(code)) {
      this.#log.error(`Command ${command} with code ${hex(code)}/${code} already registered!`)
      throw new Error(`Command ${command} with code ${hex(code)}/${code} already registered!`)
    } else {
      this.#commands.set(code, { code, command, request, response })
      this.#log.info(`Registered comman ${command} with code ${hex(code)}/${code}`)
    }
  }

  async getCommandByCode(code) {
    this.#log.trace(`Retrieving command with code ${hex(code)}/${code}`)
    if (this.#commands.has(code)) {
      const command = this.#commands.get(code)
      this.#log.debug(`Command with code ${hex(code)}/${code} found ${JSON.stringify(command)}`)
      return command
    } else {
      this.#log.warn(`Command with code ${hex(code)}/${code} not found`)
      return {
        command: 'unknown',
        code,
        request: null,
        response: UnknownResponse
      }
    }
  }
}
