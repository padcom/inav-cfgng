import { Request } from '../Request'
import { Response } from '../Response'

export const MSP_API_VERSION = 1

export class VersionRequest extends Request {
  constructor() {
    super(MSP_API_VERSION)
  }
}

export class VersionResponse extends Response {
  get msp() {
    return `${this.getUint8(0)}`
  }

  get api() {
    return `${this.getUint8(1)}.${this.getUint8(2)}.0`
  }
}
