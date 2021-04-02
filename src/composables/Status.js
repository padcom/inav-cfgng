import { reactive } from 'vue'
import { useSerialPort } from './SerialPort'
import { StatusExRequest } from '../command/v1/StatusEx'

const serial = useSerialPort()

const status = reactive({
  serialPortPath: null,
  isPortOpen: false,
  isPortReady: false,
  isStatusUpdating: false,
  cycleTime: null,
  i2cError: null,
  activeSensorsFlag: null,
  activeSensors: {},
  profile: null,
  cpuLoad: null,
  armingFlags: null,
  arming: {},
})

async function statusPollingHandler() {
  if (status.isPortReady && !status.isStatusUpdating) {
    status.isStatusUpdating = true
    try {
      const result = await serial.query(new StatusExRequest())
      status.cycleTime = result.cycleTime
      status.i2cError = result.i2cError
      status.activeSensorsFlag = result.activeSensorsFlag
      status.activeSensors = result.activeSensors
      status.profile = result.profile
      status.cpuLoad = result.cpuLoad
      status.armingFlags = result.armingFlags
      status.arming = result.arming
    } finally {
      status.isStatusUpdating = false
    }
  }
}

setInterval(statusPollingHandler, 200)

serial.on('open', path => {
  status.serialPortPath = path
  status.isPortOpen = true
})

serial.on('ready', () => {
  status.isPortReady = true
})

serial.on('close', () => {
  status.isPortOpen = false
  status.isPortReady = false
  status.isStatusUpdating = false
  status.cycleTime = null
  status.i2cError = null
  status.activeSensors = {}
  status.profile = null
  status.cpuLoad = null
  status.armingFlags = null
  status.arming = {}
})

export function useStatus() {
  return status
}
