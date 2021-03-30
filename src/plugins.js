import { readonly } from './utils'
import { Logger } from './logger'
import { Serial } from './Serial'

export const logger = {
  install(app) {
    app.mixin({
      created() {
        const file = this.$options.__file
        if (file) {
          const parts = file.split('/')
          const filename = parts[parts.length - 1]
          const loggerName = filename.split('.')[0]
          const logger = Logger.getLogger(loggerName)
          readonly(this, '$log', logger)
        }
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

        this.onSerialOpen = this.$options.onSerialOpen && this.$options.onSerialOpen.bind(this)
        this.onSerialReady = this.$options.onSerialReady && this.$options.onSerialReady.bind(this)
        this.onSerialClose = this.$options.onSerialClose && this.$options.onSerialClose.bind(this)
        this.onSerialError = this.$options.onSerialError && this.$options.onSerialError.bind(this)
        this.onSerialData = this.$options.onSerialData && this.$options.onSerialData.bind(this)

        if (this.onSerialOpen) serial.on('open', this.onSerialOpen)
        if (this.onSerialReady) serial.on('ready', this.onSerialReady)
        if (this.onSerialClose) serial.on('close', this.onSerialClose)
        if (this.onSerialError) serial.on('error', this.onSerialError)
        if (this.onSerialData) serial.on('data', this.onSerialData)
      },
      beforeUnmount() {
        if (this.onSerialOpen) serial.off('open', this.onSerialOpen)
        if (this.onSerialReady) serial.off('ready', this.onSerialReady)
        if (this.onSerialClose) serial.off('close', this.onSerialClose)
        if (this.onSerialError) serial.off('error', this.onSerialError)
        if (this.onSerialData) serial.off('data', this.onSerialData)
      }
    })
  }
}
