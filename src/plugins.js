import { readonly } from './utils'
import { Logger } from './logger'
import { Serial } from './Serial'

export const logger = {
  install(app) {
    app.mixin({
      created() {
        const parts = this.$options.__file.split('/')
        const filename = parts[parts.length - 1]
        const loggerName = filename.split('.')[0]
        const logger = Logger.getLogger(loggerName)
        readonly(this, '$log', logger)
      }
    })
  }
}

export const ipc = {
  install(app) {
    app.mixin({
      created() {
        readonly(this, '$ipc', window['ipc'])
      }
    })
  }
}

export const serial = {
  install(app) {
    const serial = new Serial()

    app.mixin({
      created() {
        readonly(this, '$serial', serial)

        this.onSerialOpen = this.$options.onSerialOpen.bind(this)
        this.onSerialClose = this.$options.onSerialClose.bind(this)
        this.onSerialError = this.$options.onSerialError.bind(this)
        this.onSerialData = this.$options.onSerialData.bind(this)

        serial.on('open', this.onSerialOpen)
        serial.on('close', this.onSerialClose)
        serial.on('error', this.onSerialError)
        serial.on('data', this.onSerialData)
      },
      beforeDestroy() {
        serial.off('open', this.onSerialOpen)
        serial.off('close', this.onSerialClose)
        serial.off('error', this.onSerialError)
        serial.off('data', this.onSerialData)
      },
      onSerialOpen(path) {},
      onSerialClose(path) {},
      onSerialError(path, error) {},
      onSerialData(path, response) {},
    })
  }
}