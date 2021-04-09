import { Request } from '../Request'
import { Response } from '../Response'

export const MSP2_INAV_SET_LOGIC_CONDITIONS = 0x2023

export class SetLogicConditionsRequest extends Request {
  #index = 0
  #condition = null

  constructor(index, condition) {
    super(MSP2_INAV_SET_LOGIC_CONDITIONS)
    this.#index = index
    this.#condition = condition
  }

  get payload() {
    const result = []
    result.push8(this.#index)
    result.push8(this.#condition.enabled)
    result.push8(this.#condition.activatorId)
    result.push8(this.#condition.operation)
    result.push8(this.#condition.a.type)
    result.push32(this.#condition.a.value)
    result.push8(this.#condition.b.type)
    result.push32(this.#condition.b.value)
    result.push8(this.#condition.flags)

    return result
  }
}

export class SetLogicConditionsResponse extends Response {
}
