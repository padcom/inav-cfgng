import { Request } from '../Request'
import { Response } from '../Response'

import {
  PORT_FUNCTION_MASK,
  PERIPHERAL_MASK,
  TELEMETRY_MASK,
  SENSOR_MASK
} from '../../models/serial-port'

export const MSP2_COMMON_SERIAL_CONFIG = 0x1009

export class CommonSerialConfigRequest extends Request {
  constructor() {
    super(MSP2_COMMON_SERIAL_CONFIG)
  }
}

export class CommonSerialConfigResponse extends Response {
  get count() {
    return this.payload.byteLength / 9
  }

  get ports() {
    const result = []
    for (let i = 0; i < this.count; i++) {
      result.push({
        identifier: this.getUint8(i * 9),
        functionMask: this.getUint32(i * 9 + 1, true),
        mspBaudrate: this.getUint8(i * 9 + 5),
        sensorBaudrate: this.getUint8(i * 9 + 6),
        telemetryBaudrate: this.getUint8(i * 9 + 7),
        peripheralBaudrate: this.getUint8(i * 9 + 8)
      })
    }

    return result
  }
}
