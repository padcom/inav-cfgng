import { Request } from '../Request'
import { Response } from '../Response'

export const MSP_MODE_RANGES = 34

export class ModeRangesRequest extends Request {
  constructor() {
    super(MSP_MODE_RANGES)
  }
}

export class ModeRangesResponse extends Response {
  get count() {
    return this.payload.byteLength / 4
  }

  get ranges() {
    const result = []
    for (let i = 0; i < this.count; i++) {
      const id = this.getUint8(i * 4)
      const auxChannelIndex = this.getUint8(i * 4 + 1)
      const start = 900 + this.getUint8(i * 4 + 2) * 25
      const end = 900 + this.getUint8(i * 4 + 3) * 25
      result.push({ id, auxChannelIndex, start, end })
    }
    return result
  }
}
