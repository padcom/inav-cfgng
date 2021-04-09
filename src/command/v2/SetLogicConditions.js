import { Request } from '../Request'
import { Response } from '../Response'

export const MSP2_INAV_SET_LOGIC_CONDITIONS = 0x2023

export class SetLogicConditionsRequest extends Request {
  #index = 0
  #enabled
  #activatorId
  #operation
  #typeOfConditionA
  #valueA
  #typeOfConditionB
  #valueB
  #flags

  constructor(index, enabled, activatorId, operation, typeOfConditionA, valueA, typeOfConditionB, valueB, flags) {
    super(MSP2_INAV_SET_LOGIC_CONDITIONS)
    this.#index = index
    this.#enabled = enabled
    this.#activatorId = activatorId
    this.#operation = operation
    this.#typeOfConditionA = typeOfConditionA
    this.#valueA = valueA
    this.#typeOfConditionB = typeOfConditionB
    this.#valueB = valueB
    this.#flags = flags
  }

  get payload() {
    const result = []
    result.push8(this.#index)
    result.push8(this.#enabled)
    result.push8(this.#activatorId)
    result.push8(this.#operation)
    result.push8(this.#typeOfConditionA)
    result.push32(this.#valueA)
    result.push8(this.#typeOfConditionB)
    result.push32(this.#valueB)
    result.push8(this.#flags)

    return result
  }
}

export class SetLogicConditionsResponse extends Response {
}
