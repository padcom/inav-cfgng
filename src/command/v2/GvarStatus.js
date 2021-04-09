import { Request } from '../Request'
import { Response } from '../Response'

export const MSP2_INAV_GVAR_STATUS = 0x2027

export class GvarStatusRequest extends Request {
  constructor() {
    super(MSP2_INAV_GVAR_STATUS)
  }
}

export class GvarStatusResponse extends Response {
  get count() {
    return this.payload.byteLength / 4
  }

  get variables() {
    const result = []
    for (let i = 0; i < this.count; i++) {
      result.push(this.getInt32(i * 4, true))
  }

    return result
  }
}
