import { useSerialPort } from './serial-port'
import { useConnectionManager } from './connection-manager'
import { useTaskScheduler } from './task-scheduler'

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

let workTimer = null

function beginWork(overlayDelay = 250) {
  workTimer = setTimeout(() => {
    document.body.classList.add('loading')
  }, overlayDelay)
}

function endWork() {
  if (workTimer) {
    clearTimeout(workTimer)
    workTimer = null
  }
  document.body.classList.remove('loading')
}

async function work(cb, overlayDelay = 250) {
  const scheduler = useTaskScheduler()
  scheduler.pause()  
  beginWork(overlayDelay)
  try {
    await cb()
  } finally {
    endWork()
    scheduler.resume()
  }
}

async function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

export function useCommonCommands() {
  return {
    saveSettingsToEeprom,
    reboot,
    getSettingInfo,
    beginWork,
    endWork,
    work,
    sleep,
  }
}