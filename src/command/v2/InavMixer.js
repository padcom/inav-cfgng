import { Request } from '../Request'
import { Response } from '../Response'

export const MSP2_INAV_MIXER = 0x2010

export class InavMixerRequest extends Request {
  constructor() {
    super(MSP2_INAV_MIXER)
  }
}

export class InavMixerResponse extends Response {
  get yawMotorDirection() {
    return this.getInt8(0)
  }

  get yawJumpPreventionLimit() {
    return this.getUint16(1, true)
  }

  get platformType() {
    return this.getInt8(3)
  }

  get hasFlaps() {
    return this.getInt8(4) !== 0
  }

  get appliedMixerPreset() {
    return this.getInt16(5, true)
  }

  get numberOfMotors() {
    return this.getInt8(7)
  }

  get numberOfServos() {
    return this.getInt8(8)
  }
}
