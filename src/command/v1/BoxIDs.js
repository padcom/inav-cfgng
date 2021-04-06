import { Request } from '../Request'
import { Response } from '../Response'

export const MSP_BOXIDS = 119

export class BoxIDsRequest extends Request {
  constructor() {
    super(MSP_BOXIDS)
  }
}

export class BoxIDsResponse extends Response {
  get count() {
    return this.payload.byteLength
  }

  get ids() {
    const result = []
    for (let i = 0; i < this.count; i++) {
      result.push(this.getUint8(i, true))
    }
    return result
  }
}
