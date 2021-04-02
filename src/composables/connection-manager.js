import { useSerialPort } from './serial-port'
import { ConnectionManager } from '../ConnectionManager'

const serial = useSerialPort()
const connectionManager = new ConnectionManager(serial)

export function useConnectionManager() {
  return connectionManager
}
