import { useSerialPort } from './serial-port'
import { TaskScheduler } from '../TaskScheduler'

const serial = useSerialPort()
const scheduler = new TaskScheduler(serial)

export function useTaskScheduler() {
  return scheduler
}
