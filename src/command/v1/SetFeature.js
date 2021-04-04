import { Request } from '../Request'
import { Response } from '../Response'

export const MSP_SET_FEATURE = 37

export class SetFeatureRequest extends Request {
  #features = 0

  constructor(features) {
    super(MSP_SET_FEATURE)
    this.#features = features
  }

  get payload() {
    const result = []
    result.push32(this.#features)

    return result
  }
}

export class SetFeatureResponse extends Response {
}
