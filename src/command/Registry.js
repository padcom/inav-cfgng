import { Logger } from '../logger'
import { hex } from '../utils'
import { UnknownResponse } from './Unknown'

export class Registry {
  #log = Logger.getLogger('REGISTRY')
  #commands = new Map()

  async registerMSPv1Command(module) {
    const command = Object.keys(module).find(key => key.startsWith('MSP_'))
    if (!command) {
      this.#log.warn('Skipping registration of', module, 'command not found')
    } else {
      this.#log.error('Registering v1 command', command)

      const reqClassName = Object.keys(module).find(key => key.endsWith('Request'))
      const resClassName = Object.keys(module).find(key => key.endsWith('Response'))

      await this.register(
        command,
        module[command],
        module[reqClassName],
        module[resClassName] || UnknownResponse
      )
    }
  }

  async registerMSPv2Command(module) {
    const command = Object.keys(module).find(key => key.startsWith('MSP2_') || key.startsWith('MSPV2_'))
    if (!command) {
      this.#log.warn('Skipping registration of', module, 'command not found')
    } else {
      this.#log.debug('Registering v2 command', module)

      const reqClassName = Object.keys(module).find(key => key.endsWith('Request'))
      const resClassName = Object.keys(module).find(key => key.endsWith('Response'))

      await this.register(
        command,
        module[command],
        module[reqClassName],
        module[resClassName] || UnknownResponse
      )
    }
  }

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
    this.#log.trace(`Retrieving command with code ${hex(code, 4)}/${code}`)
    if (this.#commands.has(code)) {
      const command = this.#commands.get(code)
      this.#log.debug(`Command with code ${hex(code, 4)}/${code} found ${JSON.stringify(command)}`)
      return command
    } else {
      this.#log.warn(`Command with code ${hex(code, 4)}/${code} not found`)
      return {
        command: 'unknown',
        code,
        request: null,
        response: UnknownResponse
      }
    }
  }
}
