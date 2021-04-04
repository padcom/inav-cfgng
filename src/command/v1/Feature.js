import { Request } from '../Request'
import { Response } from '../Response'

export const MSP_FEATURE = 36

export class FeatureRequest extends Request {
  constructor() {
    super(MSP_FEATURE)
  }
}

export class FeatureResponse extends Response {
  get features() {
    return this.getUint32(0, true)
  }
}
