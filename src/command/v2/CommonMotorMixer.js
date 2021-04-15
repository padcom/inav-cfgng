import { Request } from '../Request'
import { Response } from '../Response'

import { MotorMixRule } from '../../models/mixer'

export const MSP2_COMMON_MOTOR_MIXER = 0x1005

export class CommonMotorMixerRequest extends Request {
  constructor() {
    super(MSP2_COMMON_MOTOR_MIXER)
  }
}

export class CommonMotorMixerResponse extends Response {
  get count() {
    return this.payload.byteLength / 8
  }

  get mixers() {
    const result = []
    for (let i = 0; i < this.count; i++) {
      result.push(new MotorMixRule(
        (this.getUint16(i * 8, true) / 1000),
        (this.getUint16(i * 8 + 2, true) / 1000) - 2,
        (this.getUint16(i * 8 + 4, true) / 1000) - 2,
        (this.getUint16(i * 8 + 6, true) / 1000) - 2
      ))
    }

    return result.filter(rule => rule.isUsed)
  }
}
