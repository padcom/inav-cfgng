import { ref } from 'vue'
import { Logger } from '../logger'
import { settings } from '../settings'
import { useSerialPort } from './serial-port'
import { useTaskScheduler } from './task-scheduler'
import { DATA_TYPE } from '../models/data-type'
import { CommonSettingRequest } from '../command/v2/CommonSetting'
import { CommonSetSettingRequest } from '../command/v2/CommonSetSetting'

const log = Logger.getLogger('SETTINGS')
const container = ref(settings)

async function loadSettings(...items) {
  log.info('Loading', items.join(', '))
  const serial = useSerialPort()
  const scheduler = useTaskScheduler()
  const settings = container.value

  try {
    await scheduler.pause()
    for (let i = 0; i < items.length; i++) {
      const setting = settings[items[i]]
      const response = await serial.query(new CommonSettingRequest(setting.name))

      if (setting.type === DATA_TYPE.LOOKUP) {
        setting.value = response.unsigned
      } else if (setting.type === DATA_TYPE.STRING) {
        setting.value = response.string
      } else if (setting.type === DATA_TYPE.INT8) {
        setting.value = response.signed
      } else if (setting.type === DATA_TYPE.INT16) {
        setting.value = response.signed
      } else if (setting.type === DATA_TYPE.INT32) {
        setting.value = response.signed
      } else if (setting.type === DATA_TYPE.FLOAT) {
        setting.value = Math.round(response.float * 1000000) / 1000000
      } else {
        setting.type = response.unsignedType
        setting.value = response.unsigned
      }
    }
    log.info('Settings loaded.')
  } catch (e) {
    log.error('Error while loading settings', e)
    throw e
  } finally {
    await scheduler.resume()
  }
}

async function saveSetting(item) {
  log.info('Saving setting', item)
  const scheduler = useTaskScheduler()
  const serial = useSerialPort()
  const settings = container.value

  try {
    await scheduler.pause()
    const setting = settings[item]
    await serial.query(new CommonSetSettingRequest(setting.name, setting.type, setting.value))
    log.info('Setting', item, 'saved.')
  } catch (e) {
    log.error('Error while saving settings', e)
    throw e
  } finally {
    await scheduler.resume()
  }
}

async function saveSettings(...items) {
  log.info('Saving settings', items.join(', '))
  const scheduler = useTaskScheduler()
  const serial = useSerialPort()
  const settings = container.value

  try {
    await scheduler.pause()
    for (let i = 0; i < items.length; i++) {
      const setting = settings[items[i]]
      await serial.query(new CommonSetSettingRequest(setting.name, setting.type, setting.value))
    }
    log.info('Settings saved.')
  } catch (e) {
    log.error('Error while saving settings', e)
    throw e
  } finally {
    await scheduler.resume()
  }
}

export function useSettings() {
  return {
    settings: container,
    load: loadSettings,
    save: saveSettings,
    saveSetting,
  }
}
