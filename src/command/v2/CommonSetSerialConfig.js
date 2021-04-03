import { Request } from '../Request'
import { Response } from '../Response'

import {
  PORT_FUNCTION_MASK,
  PERIPHERAL_MASK,
  TELEMETRY_MASK,
  SENSOR_MASK
} from '../../models/serial-port'

export const MSP2_COMMON_SET_SERIAL_CONFIG = 0x100A

export class CommonSetSerialConfigRequest extends Request {
  #ports = []

  constructor(ports) {
    super(MSP2_COMMON_SET_SERIAL_CONFIG)
    this.#ports = ports
  }

  get payload() {
    const result = []
    for (let i = 0; i < this.#ports.length; i++) {
      result.push8(this.#ports[i].identifier)
      result.push32(this.#ports[i].functionMask)
      result.push(this.#ports[i].mspBaudrate)
      result.push(this.#ports[i].sensorBaudrate)
      result.push(this.#ports[i].telemetryBaudrate)
      result.push(this.#ports[i].peripheralBaudrate)
    }

    return result
  }
}

export class CommonSetSerialConfigResponse extends Response {
}
