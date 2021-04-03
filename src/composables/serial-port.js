import { Serial } from '../SerialPort'

const serialPort = new Serial()

export function useSerialPort() {
  return serialPort
}
