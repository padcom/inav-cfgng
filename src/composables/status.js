import { reactive } from 'vue'
import { useSerialPort } from './serial-port'
import { useTaskScheduler } from './task-scheduler'
import { StatusExRequest } from '../command/v1/StatusEx'
import { UidRequest } from '../command/v1/Uid'

const serial = useSerialPort()
const scheduler = useTaskScheduler(serial)

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

scheduler.enqueue(1, new StatusExRequest(), async response => {
  status.cycleTime = response.cycleTime
  status.i2cError = response.i2cError
  status.activeSensorsFlag = response.activeSensorsFlag
  status.activeSensors = response.activeSensors
  status.profile = response.profile
  status.cpuLoad = response.cpuLoad
  status.armingFlags = response.armingFlags
  status.arming = response.arming
})

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
