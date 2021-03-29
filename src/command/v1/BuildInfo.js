import { Request } from '../Request'
import { Response } from '../Response'

export const MSP_BUILD_INFO = 5

export class BuildInfoRequest extends Request {
  constructor() {
    super(MSP_BUILD_INFO)
  }
}

export class BuildInfoResponse extends Response {
  get date() {
    return this.getString(0, 11)
  }

  get time() {
    return this.getString(11, 8)
  }
}
