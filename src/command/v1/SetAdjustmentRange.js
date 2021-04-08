import { Request } from '../Request'
import { Response } from '../Response'

export const MSP_SET_ADJUSTMENT_RANGE = 53

export class SetAdjustmentRangeRequest extends Request {
  #index = 0
  #auxChannelIndex = 0
  #start = 900
  #end = 900
  #fn = 0
  #auxSwitchChannelIndex = 0
  #slot = 0

  constructor(index, auxChannelIndex = 0, start = 900, end = 900, fn = 0, auxSwitchChannelIndex = 0, slot = 0) {
    super(MSP_SET_ADJUSTMENT_RANGE)
    this.#index = index
    this.#auxChannelIndex = auxChannelIndex
    this.#start = start
    this.#end = end
    this.#fn = fn
    this.#auxSwitchChannelIndex = auxSwitchChannelIndex
    this.#slot = slot
  }

  get payload() {
    const result = []
    result.push8(this.#index)
    result.push8(this.#slot)
    result.push8(this.#auxChannelIndex)
    result.push8(Math.round((this.#start - 900) / 25))
    result.push8(Math.round((this.#end - 900) / 25))
    result.push8(this.#fn)
    result.push8(this.#auxSwitchChannelIndex)

    return result
  }
}

export class SetAdjustmentRangeResponse extends Response {
}
