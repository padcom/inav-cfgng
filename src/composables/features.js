import { ref } from 'vue'
import { Logger } from '../logger'
import { FeatureRequest } from '../command/v1/Feature'
import { SetFeatureRequest } from '../command/v1/SetFeature'
import { useSerialPort } from './serial-port'
import { useTaskScheduler } from './task-scheduler'

const log = Logger.getLogger('FEATURES')
const features = ref(0)

async function load() {
  log.info('Loading features')
  const scheduler = useTaskScheduler()
  const port = useSerialPort()
  try {
    await scheduler.pause()
    const response = await port.query(new FeatureRequest())
    features.value = response.features
    log.info('Features loaded.')
  } catch (e) {
    log.error('Error while loading features', e)
    throw e
  } finally {
    await scheduler.resume()
  }
}

async function save() {
  log.info('Saving features')
  const scheduler = useTaskScheduler()
  const port = useSerialPort()

  try {
    await scheduler.pause()
    await port.query(new SetFeatureRequest(features.value))
    log.info('Features saved.')
  } catch (e) {
    log.error('Error while saving settings', e)
    throw e
  } finally {
    await scheduler.resume()
  }
}

export function useFeatures() {
  return {
    features,
    load,
    save
  }
}
