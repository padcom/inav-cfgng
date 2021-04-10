import { Request } from '../Request'
import { Response } from '../Response'

export const MSP_SENSOR_CONFIG = 96

export class SensorConfigRequest extends Request {
  constructor() {
    super(MSP_SENSOR_CONFIG)
  }
}

export class SensorConfigResponse extends Response {
  get accelerometer() {
    return this.getUint8(0, true)
  }

  get barometer() {
    return this.getUint8(1, true)
  }

  get magnetometer() {
    return this.getUint8(2, true)
  }

  get pitot() {
    return this.getUint8(3, true)
  }

  get rangefinder() {
    return this.getUint8(4, true)
  }

  get opflow() {
    return this.getUint8(5, true)
  }
}
