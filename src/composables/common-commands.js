import { useSerialPort } from './serial-port'
import { useConnectionManager } from './connection-manager'

import { EepromWriteRequest } from '../command/v1/EepromWrite'

async function saveSettingsToEeprom() {
  await useSerialPort().query(new EepromWriteRequest())
}

async function reboot() {
  await useConnectionManager().reboot()
}

export function useCommonCommands() {
  return {
    saveSettingsToEeprom,
    reboot
  }
}