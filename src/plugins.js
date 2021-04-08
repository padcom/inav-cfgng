import { readonly } from './utils'
import { Logger } from './logger'
import { useSerialPort } from './composables/serial-port'
import { useTaskScheduler } from './composables/task-scheduler'

const ipcBus = window['ipc']

export const logger = {
  install(app) {
    app.mixin({
      created() {
        const logger = Logger.getLogger(this.$options.name || 'MAIN')
        readonly(this, '$log', logger)
      }
    })
  }
}

export const ipc = {
  install(app) {
    app.mixin({
      created() {
        readonly(this, '$ipc', ipcBus)
      }
    })
  }
}

export const serial = {
  install(app) {
    const serialPort = useSerialPort()

    app.mixin({
      beforeCreate() {
        readonly(this, '$serial', serialPort)

        this.onSerialPortListUpdated = this.$options.onSerialPortListUpdated && this.$options.onSerialPortListUpdated.bind(this)
        this.onSerialOpen = this.$options.onSerialOpen && this.$options.onSerialOpen.bind(this)
        this.onSerialReady = this.$options.onSerialReady && this.$options.onSerialReady.bind(this)
        this.onSerialClose = this.$options.onSerialClose && this.$options.onSerialClose.bind(this)
        this.onSerialError = this.$options.onSerialError && this.$options.onSerialError.bind(this)
        this.onSerialBuffer = this.$options.onSerialBuffer && this.$options.onSerialBuffer.bind(this)
        this.onSerialPacketReceived = this.$options.onSerialPacketReceived && this.$options.onSerialPacketReceived.bind(this)

        if (this.onSerialPortListUpdated) ipcBus.on('serial.list-updated', this.onSerialPortListUpdated)
        if (this.onSerialOpen) serialPort.on('open', this.onSerialOpen)
        if (this.onSerialReady) serialPort.on('ready', this.onSerialReady)
        if (this.onSerialClose) serialPort.on('close', this.onSerialClose)
        if (this.onSerialError) serialPort.on('error', this.onSerialError)
        if (this.onSerialBuffer) serialPort.on('buffer', this.onSerialBuffer)
        if (this.onSerialPacketReceived) serialPort.on('packet', this.onSerialPacketReceived)
      },
      beforeUnmount() {
        if (this.onSerialPortListUpdated) serialPort.off('serial.list-updated', this.onSerialPortListUpdated)
        if (this.onSerialOpen) serialPort.off('open', this.onSerialOpen)
        if (this.onSerialReady) serialPort.off('ready', this.onSerialReady)
        if (this.onSerialClose) serialPort.off('close', this.onSerialClose)
        if (this.onSerialError) serialPort.off('error', this.onSerialError)
        if (this.onSerialBuffer) serialPort.off('buffer', this.onSerialBuffer)
        if (this.onSerialPacketReceived) serialPort.off('packet', this.onSerialPacketReceived)
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
