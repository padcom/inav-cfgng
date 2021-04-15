import { Request } from '../Request'
import { Response } from '../Response'

import { ServoMixRule } from '../../models/mixer'

export const MSPV2_INAV_OUTPUT_MAPPING = 0x200A

export class InavOutputMappingRequest extends Request {
  constructor() {
    super(MSPV2_INAV_OUTPUT_MAPPING)
  }
}

const TIM_USE_MC_MOTOR = 2;     // Multicopter motor output
const TIM_USE_MC_SERVO = 3;     // Multicopter servo output (i.e. TRI)
const TIM_USE_FW_MOTOR = 5;
const TIM_USE_FW_SERVO = 6;

export const OUTPUT_TYPE_FLAG = {
  SERVO: 1,
  MOTOR: 2,
}

export class InavOutputMappingResponse extends Response {
  get count() {
    return this.payload.byteLength
  }

  get mappings() {
    const result = []
    for (let i = 0; i < this.count; i++) {
      result.push(this.getInt8(i))
    }

    return result
  }

  get mrTimerMap() {
    const result = new Array(this.count)

    for (let i = 0; i < this.count; i++) {
      const output = this.mappings[i]
      result[i] = 0
      if (output & (1 << TIM_USE_MC_MOTOR)) {
        result[i] |= OUTPUT_TYPE_FLAG.MOTOR
      }
      if (output & (1 << TIM_USE_MC_SERVO)) {
        result[i] |= OUTPUT_TYPE_FLAG.SERVO
      }
    }

    return result.filter(output => output !== 0)
  }

  get fwTimerMap() {
    const result = new Array(this.count)

    for (let i = 0; i < this.count; i++) {
      const output = this.mappings[i]
      result[i] = 0
      if (output & (1 << TIM_USE_FW_MOTOR)) {
        result[i] |= OUTPUT_TYPE_FLAG.MOTOR
      }
      if (output & (1 << TIM_USE_FW_SERVO)) {
        result[i] |= OUTPUT_TYPE_FLAG.SERVO
      }
    }

    return result.filter(output => output !== 0)
  }
}
