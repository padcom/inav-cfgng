import { Request } from '../Request'
import { Response } from '../Response'

export const MSP_FC_VARIANT = 2

export class FcVariantRequest extends Request {
  constructor() {
    super(MSP_FC_VARIANT)
  }
}

export class FcVariantResponse extends Response {
  get variant() {
    return this.getString(0, 4)
  }
}
