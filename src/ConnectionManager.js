import semver from 'semver'
import { Logger } from './logger'
import { waitForSingleEvent, runWithTimeout, hex, sleep } from './utils'
import { VersionRequest } from './command/v1/Version'
import { FcVersionRequest } from './command/v1/FcVersion'
import { FcVariantRequest } from './command/v1/FcVariant'
import { BuildInfoRequest } from './command/v1/BuildInfo'
import { BoardInfoRequest } from './command/v1/BoardInfo'
import { UidRequest } from './command/v1/Uid'
import { SetRebootRequest } from './command/v1/SetReboot'

export class ConnectionManager {
  #log = Logger.getLogger('MAIN')
  #serial = null
  #path = null
  #fcVariant = null
  #fcVersion = null

  constructor(serial) {
    this.#serial = serial
    this.#serial.on('close', () => {
      this.#log.info('Serial port disconnected')
    })
    this.#serial.on('ready', () => {
      this.#log.info('Serial port connected and ready')
    })
  }

  async connect(path) {
    this.#path = path
    this.#serial.resetProtocolToMSPv1()

    try {
      await this.#waitForPortToExist(path)
      await this.#waitForPortToOpen(path)

      await this.#readVersionInformation()
      await this.#readFcInformation()
      await this.#readFirmwareBuildInformation()
      await this.#readBoardInformation()
      await this.#readDeviceIdInformatin()

      this.#serial.emit('ready', path, this.#fcVariant, this.#fcVersion)
    } catch (e) {
      this.#log.error('Timed out waiting to open serial port', this.#path)
      this.#serial.close()
      this.#serial.emit('close')
    }
  }

  async disconnect() {
    const isPortOpen = await this.#serial.isOpen(this.#path)
    if (isPortOpen) {
      this.#serial.close()
      await waitForSingleEvent(this.#serial, 'close')
    }
  }

  async reconnect() {
    await this.disconnect()
    await this.connect(this.#path)
  }

  async reboot() {
    this.#log.info('Rebooting')
    this.#serial.send(new SetRebootRequest())
    this.#serial.close()
    // wait a little bit for the controller to start rebooting
    await sleep(1000)
    await this.reconnect()
  }

  async #waitForPortToExist(path) {
    await runWithTimeout(500, 15000, async () => await this.#serial.exists(path))
  }

  async #waitForPortToOpen(path) {
    this.#serial.open(path)
    await waitForSingleEvent(this.#serial, 'open')
    this.#log.info(`Serial port ${path} <span class="success">successfully</span> opened`)
  }

  async #readVersionInformation() {
    const version = await this.#serial.query(new VersionRequest(), 15000)
    this.#log.info(`MultiWii API version <span class="success">received</span> - ${version.api}`)
    if (semver.gte(version.api, '2.0.0')) {
      this.#log.info('MultiWii protocol >= 2.0.0 - switching to MSPv2')
      this.#serial.upgradeProtocolToMSPv2()
    }
  }

  async #readFcInformation() {
    const fcVersion = await this.#serial.query(new FcVersionRequest())
    this.#fcVersion = fcVersion.version
    const fcVariant = await this.#serial.query(new FcVariantRequest())
    this.#fcVariant = fcVariant.variant
    this.#log.info(`Flight controller info, identifier: <strong>${fcVariant.variant}</strong>, version: <strong>${fcVersion.version}</strong>`)
  }

  async #readFirmwareBuildInformation() {
    const buildInfo = await this.#serial.query(new BuildInfoRequest())
    this.#log.info(`Running firmware released on: <strong>${buildInfo.date} ${buildInfo.time}</strong>`)
  }

  async #readBoardInformation() {
    const boardInfo = await this.#serial.query(new BoardInfoRequest())
    this.#log.info(`Board: <strong>${boardInfo.identifier}</strong>, version: <strong>${boardInfo.version}</strong>`)
  }

  async #readDeviceIdInformatin() {
    const uid = await this.#serial.query(new UidRequest())
    this.#log.info(`Unique device ID <span class="success">received</span> - <strong>0x${hex(uid.uid[0], 8, '')}${hex(uid.uid[1], 8, '')}${hex(uid.uid[2], 8, '')}</strong>`)
  }
}
