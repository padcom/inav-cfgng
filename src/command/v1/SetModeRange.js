import { Request } from '../Request'
import { Response } from '../Response'

export const MSP_SET_MODE_RANGE = 35

export class ClearModeRangeRequest extends Request {
  #index = 0
  constructor(index) {
    super(MSP_SET_MODE_RANGE)
    this.#index = index
  }

  get payload() {
    const result = []
    result.push8(this.#index)
    result.push32(0)

    return result
  }
}

export class SetModeRangeRequest extends Request {
  #index = 0
  #id = 0
  #auxChannelIndex = 0
  #start = 900
  #end = 900

  constructor(index, id = 0, auxChannelIndex = 0, start = 900, end = 900) {
    super(MSP_SET_MODE_RANGE)
    this.#index = index
    this.#id = id
    this.#auxChannelIndex = auxChannelIndex
    this.#start = start
    this.#end = end
  }

  get payload() {
    const result = []
    result.push8(this.#index)
    result.push8(this.#id)
    result.push8(this.#auxChannelIndex)
    result.push8(Math.round((this.#start - 900) / 25))
    result.push8(Math.round((this.#end - 900) / 25))

    return result
  }
}

export class SetModeRangeResponse extends Response {
}
