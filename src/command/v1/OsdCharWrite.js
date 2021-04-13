import { Request } from '../Request'
import { Response } from '../Response'

export const MSP_OSD_CHAR_WRITE = 87

export class OsdCharWriteRequest extends Request {
  #index = null
  #bytes = []

  constructor(index, bytes) {
    super(MSP_OSD_CHAR_WRITE)
    this.#index = index
    this.#bytes = bytes
  }

  get payload() {
    const result = []

    result.push16(this.#index)
    for (let i = 0; i < this.#bytes.length; i++) {
      result.push8(this.#bytes[i])
    }

    return result
  }
}

export class OsdCharWriteResponse extends Response {
}
