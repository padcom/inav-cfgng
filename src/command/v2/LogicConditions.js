import { Request } from '../Request'
import { Response } from '../Response'

export const MSP2_INAV_LOGIC_CONDITIONS = 0x2022

export class LogicConditionsRequest extends Request {
  constructor() {
    super(MSP2_INAV_LOGIC_CONDITIONS)
  }
}

export class LogicConditionsResponse extends Response {
  get count() {
    return this.payload.byteLength / 14
  }

  get conditions() {
    const result = []

    for (let i = 0; i < this.count; i++) {
      const enabled = this.getUint8(i * 14 + 0)
      const activatorId = this.getInt8(i * 14 + 1)
      const operation = this.getUint8(i * 14 + 2)
      const a = {
        type: this.getUint8(i * 14 + 3),
        value: this.getInt32(i * 14 + 4, true)
      }
      const b = {
        type: this.getUint8(i * 14 + 8),
        value: this.getInt32(i * 14 + 9, true)
      }
      const flags = this.getUint8(i * 14 + 13)

      result.push({ enabled, activatorId, operation, a, b, flags })
  }

    return result
  }
}
