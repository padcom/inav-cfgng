import { Request } from '../Request'
import { Response } from '../Response'

export const MSP_SET_RX_MAP = 65

export class SetRxMapRequest extends Request {
  #map = []

  constructor(map) {
    super(MSP_SET_RX_MAP)
    this.#map = map
  }

  get payload() {
    const result = []
    for (let i = 0; i < this.#map.length; i++) {
      result.push8(this.#map[i])
    }

    return result
  }
}

export class SetRxMapResponse extends Response {
}
