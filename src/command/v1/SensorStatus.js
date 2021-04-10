import { Request } from '../Request'
import { Response } from '../Response'

export const MSP_SENSOR_STATUS = 151

export class SensorStatusRequest extends Request {
  constructor() {
    super(MSP_SENSOR_STATUS)
  }
}

export class SensorStatusResponse extends Response {
  get isHardwareHealthy() {
    return this.getUint8(0, true)
  }

  get gyroscope() {
    return this.getUint8(1, true)
  }

  get accelerometer() {
    return this.getUint8(2, true)
  }

  get magnetometer() {
    return this.getUint8(3, true)
  }

  get barometer() {
    return this.getUint8(4, true)
  }

  get gps() {
    return this.getUint8(5, true)
  }

  get rangefinder() {
    return this.getUint8(6, true)
  }

  get pitot() {
    return this.getUint8(7, true)
  }

  get opflow() {
    return this.getUint8(8, true)
  }
}
