import { Request } from '../Request'
import { Response } from '../Response'

export const MSP_ADJUSTMENT_RANGES = 52

export class AdjustmentRangesRequest extends Request {
  constructor() {
    super(MSP_ADJUSTMENT_RANGES)
  }
}

export class AdjustmentRangesResponse extends Response {
  get count() {
    return this.payload.byteLength / 6
  }

  get ranges() {
    const result = []
    for (let i = 0; i < this.count; i++) {
      const slot = this.getUint8(i * 6)
      const auxChannelIndex = this.getUint8(i * 6 + 1)
      const start = 900 + this.getUint8(i * 6 + 2) * 25
      const end = 900 + this.getUint8(i * 6 + 3) * 25
      const fn = this.getUint8(i * 6 + 4)
      const auxSwitchChannelIndex = this.getUint8(i * 6 + 5)
      result.push({ slot, auxChannelIndex, start, end, fn, auxSwitchChannelIndex })
    }
    return result
  }
}
