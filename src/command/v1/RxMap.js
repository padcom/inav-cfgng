import { Request } from '../Request'
import { Response } from '../Response'

export const MSP_RX_MAP = 64

export class RxMapRequest extends Request {
  constructor() {
    super(MSP_RX_MAP)
  }
}

export class RxMapResponse extends Response {
  get count() {
    return this.payload.byteLength
  }

  get mappings() {
    const result = []
    for (let i = 0; i < this.count; i++) {
      result.push(this.getUint8(i))
    }

    return result
  }
}
