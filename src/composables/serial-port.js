import { Serial } from '../Serial'

const serialPort = new Serial()

export function useSerialPort() {
  return serialPort
}
