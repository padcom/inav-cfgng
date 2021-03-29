import { Request } from '../Request'
import { Response } from '../Response'

export const MSP_BOARD_INFO = 4

export class BoardInfoRequest extends Request {
  constructor() {
    super(MSP_BOARD_INFO)
  }
}

export class BoardInfoResponse extends Response {
  get identifier() {
    return this.getString(0)
  }

  get version() {
    return this.getUint16(this.identifier.length, true)
  }
}
