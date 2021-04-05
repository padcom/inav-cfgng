import { Request } from '../Request'
import { Response } from '../Response'

export const MSP_RC = 105

export class RcRequest extends Request {
  constructor() {
    super(MSP_RC)
  }
}

export class RcResponse extends Response {
  get count() {
    return this.payload.byteLength / 2
  }

  get channels() {
    const result = []
    for (let i = 0; i < this.count; i++) {
      result.push(this.getUint16(i * 2, true))
    }
    return result
  }
}
