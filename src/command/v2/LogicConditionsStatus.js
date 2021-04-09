import { Request } from '../Request'
import { Response } from '../Response'

export const MSP2_INAV_LOGIC_CONDITIONS_STATUS = 0x2026

export class LogicConditionsStatusRequest extends Request {
  constructor() {
    super(MSP2_INAV_LOGIC_CONDITIONS_STATUS)
  }
}

export class LogicConditionsStatusResponse extends Response {
  get count() {
    return this.payload.byteLength / 4
  }

  get status() {
    const result = []
    for (let i = 0; i < this.count; i++) {
      result.push(this.getInt32(i * 4, true))
    }

    return result
  }
}
