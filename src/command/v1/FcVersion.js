import { Request } from '../Request'
import { Response } from '../Response'

export const MSP_FC_VERSION = 3

export class FcVersionRequest extends Request {
  constructor() {
    super(MSP_FC_VERSION)
  }
}

export class FcVersionResponse extends Response {
  get version() {
    return `${this.getUint8(0)}.${this.getUint8(1)}.${this.getUint8(2)}`
  }
}
