import { Request } from '../Request'
import { Response } from '../Response'

export const MSP_STATUS_EX = 150

export class StatusExRequest extends Request {
  constructor() {
    super(MSP_STATUS_EX)
  }
}

export class StatusExResponse extends Response {
  get cycleTime() {
    return this.getUint16(0, true)
  }

  get i2cError() {
    return this.getUint16(2, true)
  }

  get activeSensors() {
    return this.getUint16(4, true)
  }

  get profile() {
    return this.getUint8(10)
  }

  get cpuLoad() {
    return this.getUint16(11, true)
  }

  get armingFlags() {
    return this.getUint16(13, true)
  }
}
