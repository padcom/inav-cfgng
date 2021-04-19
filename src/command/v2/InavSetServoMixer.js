import { Request } from '../Request'
import { Response } from '../Response'

import { ServoMixRule } from '../../models/mixer'

export const MSP2_INAV_SET_SERVO_MIXER = 0x2021

export class InavSetServoMixerRequest extends Request {
  #index
  #mixer

  constructor(index, mixer) {
    super(MSP2_INAV_SET_SERVO_MIXER)
    
    this.#index = index
    this.#mixer = mixer
  }
  
  get payload() {
    const result = []

    result.push8(this.#index)
    result.push8(this.#mixer.target)
    result.push8(this.#mixer.input)
    result.push16(this.#mixer.rate)
    result.push8(this.#mixer.speed)
    result.push8(this.#mixer.condition)
    
    
    return result
  }
}

export class InavSetServoMixerResponse extends Response {
}
