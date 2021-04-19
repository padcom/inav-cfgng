import { Request } from '../Request'
import { Response } from '../Response'

export const MSP2_INAV_SET_MIXER = 0x2011

export class InavSetMixerRequest extends Request {
  #yawMotorDirection
  #yawJumpPreventionLimit
  #platformType
  #hasFlaps
  #mixerPreset

  constructor(yawMotorDirection, yawJumpPreventionLimit, platformType, hasFlaps, mixerPreset) {
    super(MSP2_INAV_SET_MIXER)
    this.#yawMotorDirection = yawMotorDirection
    this.#yawJumpPreventionLimit = yawJumpPreventionLimit
    this.#platformType = platformType
    this.#hasFlaps = hasFlaps
    this.#mixerPreset = mixerPreset
  }
  
  get payload() {
    const result = []

    result.push8(this.#yawMotorDirection)
    result.push16(this.#yawJumpPreventionLimit)
    result.push8(this.#platformType)
    result.push8(this.#hasFlaps)
    result.push16(this.#mixerPreset)
    
    return result
  }
}

export class InavSetMixerResponse extends Response {
}
