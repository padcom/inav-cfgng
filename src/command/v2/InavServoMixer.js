import { Request } from '../Request'
import { Response } from '../Response'

import { ServoMixRule } from '../../models/mixer'

export const MSP2_INAV_SERVO_MIXER = 0x2020

export class InavServoMixerRequest extends Request {
  constructor() {
    super(MSP2_INAV_SERVO_MIXER)
  }
}

export class InavServoMixerResponse extends Response {
  get count() {
    return this.payload.byteLength / 6
  }

  get mixers() {
    const result = []
    for (let i = 0; i < this.count; i++) {
      result.push(new ServoMixRule(
        this.getInt8(i * 6),
        this.getInt8(i * 6 + 1),
        this.getInt16(i * 6 + 2, true),
        this.getInt8(i * 6 + 4),
        this.getInt8(i * 6 + 5)
      ))
    }

    return result.filter(rule => rule.isUsed)
  }
}
