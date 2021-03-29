import { Request } from '../Request'
import { Response } from '../Response'
import { hex } from '../../utils'

export const MSP_UID = 160

export class UidRequest extends Request {
  constructor() {
    super(MSP_UID)
  }
}

export class UidResponse extends Response {
  get uid() {
    return [
      hex(this.getUint32(0, true), 8),
      hex(this.getUint32(4, true), 8),
      hex(this.getUint32(8, true), 8)
    ]
  }
}
