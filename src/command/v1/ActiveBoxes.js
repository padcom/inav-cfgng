import { Request } from '../Request'
import { Response } from '../Response'

export const MSP_ACTIVEBOXES = 113

export class ActiveBoxesRequest extends Request {
  constructor() {
    super(MSP_ACTIVEBOXES)
  }
}

export class ActiveBoxesResponse extends Response {
  get count() {
    return this.payload.byteLength / 4
  }

  get flags() {
    const result = []
    for (let i = 0; i < this.count; i++) {
      result.push(this.getUint32(i * 4, true))
    }
    return result
  }
}
