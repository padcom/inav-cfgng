import { useSerialPort } from './serial-port'
import { useConnectionManager } from './connection-manager'

import { EepromWriteRequest } from '../command/v1/EepromWrite'
import { CommonSettingInfoRequest } from '../command/v2/CommonSettingInfo'

async function saveSettingsToEeprom() {
  await useSerialPort().query(new EepromWriteRequest())
}

async function reboot() {
  await useConnectionManager().reboot()
}

async function getSettingInfo(name) {
  return await useSerialPort().query(new CommonSettingInfoRequest(name))
}

export function useCommonCommands() {
  return {
    saveSettingsToEeprom,
    reboot,
    getSettingInfo
  }
}