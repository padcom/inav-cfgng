import { readonly } from './utils'
import { Logger } from './logger'
import { useSerialPort } from './composables/serial-port'
import { useTaskScheduler } from './composables/task-scheduler'

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

    app.mixin({
      beforeCreate() {
        const serialPort = useSerialPort()
        readonly(this, '$serial', serialPort)

        this.onSerialOpen = this.$options.onSerialOpen && this.$options.onSerialOpen.bind(this)
        this.onSerialReady = this.$options.onSerialReady && this.$options.onSerialReady.bind(this)
        this.onSerialClose = this.$options.onSerialClose && this.$options.onSerialClose.bind(this)
        this.onSerialError = this.$options.onSerialError && this.$options.onSerialError.bind(this)
        this.onSerialPacketEnqueued = this.$options.onSerialPacketEnqueued && this.$options.onSerialPacketEnqueued.bind(this)
        this.onSerialPacketDequeued = this.$options.onSerialPacketDequeued && this.$options.onSerialPacketDequeued.bind(this)
        this.onSerialPacketReceived = this.$options.onSerialPacketReceived && this.$options.onSerialPacketReceived.bind(this)
        this.onSerialBuffer = this.$options.onSerialBuffer && this.$options.onSerialBuffer.bind(this)

        if (this.onSerialOpen) serialPort.on('open', this.onSerialOpen)
        if (this.onSerialReady) serialPort.on('ready', this.onSerialReady)
        if (this.onSerialClose) serialPort.on('close', this.onSerialClose)
        if (this.onSerialError) serialPort.on('error', this.onSerialError)
        if (this.onSerialPacketEnqueued) serialPort.on('enqueued', this.onSerialPacketEnqueued)
        if (this.onSerialPacketDequeued) serialPort.on('dequeued', this.onSerialPacketDequeued)
        if (this.onSerialPacketReceived) serialPort.on('packet', this.onSerialPacketReceived)
        if (this.onSerialBuffer) serialPort.on('buffer', this.onSerialBuffer)
      },
      beforeUnmount() {
        if (this.onSerialOpen) serialPort.off('open', this.onSerialOpen)
        if (this.onSerialReady) serialPort.off('ready', this.onSerialReady)
        if (this.onSerialClose) serialPort.off('close', this.onSerialClose)
        if (this.onSerialError) serialPort.off('error', this.onSerialError)
        if (this.onSerialPacket) serialPort.off('packet', this.onSerialPacket)
      }
    })
  }
}

export const taskScheduler = {
  install(app) {
    app.mixin({
      beforeCreate() {
        readonly(this, '$scheduler', useTaskScheduler())
      }
    })
  }
}
