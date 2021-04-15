import { Request } from '../Request'
import { Response } from '../Response'

export const MSP_SERVO_CONFIGURATIONS = 120

export class ServoConfigurationsRequest extends Request {
  constructor() {
    super(MSP_SERVO_CONFIGURATIONS)
  }
}

export class ServoConfigurationsResponse extends Response {
  get count() {
    return this.payload.byteLength / 14
  }
}
