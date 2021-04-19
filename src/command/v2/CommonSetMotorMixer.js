import { Request } from '../Request'
import { Response } from '../Response'

import { MotorMixRule } from '../../models/mixer'

export const MSP2_COMMON_SET_MOTOR_MIXER = 0x1006

export class CommonSetMotorMixerRequest extends Request {
  #index
  #mixer

  constructor(index, mixer) {
    super(MSP2_COMMON_SET_MOTOR_MIXER)

    this.#index = index
    this.#mixer = mixer.clone()
  }
  
  get payload() {
    const result = []

    result.push8(this.#index)
    result.push16(this.#mixer.throttle * 1000)
    result.push16((this.#mixer.roll + 2) * 1000)
    result.push16((this.#mixer.pitch + 2) * 1000)
    result.push16((this.#mixer.yaw + 2) * 1000)
    
    return result
  }
}

export class CommonSetMotorMixerResponse extends Response {
}
