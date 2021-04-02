import { Request } from '../Request'
import { Response } from '../Response'

export const MSP_SET_REBOOT = 68

export class SetRebootRequest extends Request {
  constructor() {
    super(MSP_SET_REBOOT)
  }
}

export class SetRebootResponse extends Response {
}
