import { Request } from '../Request'
import { Response } from '../Response'

import { DATA_TYPE } from '../../models/data-type'

export const MSP2_COMMON_SET_SETTING = 0x1004

export class CommonSetSettingRequest extends Request {
  #index = null
  #type = null
  #value = null

  constructor(index, type, value) {
    super(MSP2_SET_SETTING)
    this.#index = index
    this.#type = type
    this.#value = value
  }

  get payload() {
    const result = []
    result.push8(0)
    result.push16(this.#index)
    switch (this.#type) {
      case DATA_TYPE.UINT8:
        result.push8(this.#value)
        break
      case DATA_TYPE.INT8:
        result.push8(this.#value)
        break
      case DATA_TYPE.UINT16:
        result.push16(this.#value)
        break
      case DATA_TYPE.INT16:
        result.push16(this.#value)
        break
      case DATA_TYPE.UINT32:
        result.push32(this.#value)
        break
      case DATA_TYPE.FLOAT:
        result.push32(this.#value)
        break
      case DATA_TYPE.STRING:
        result.pushString(this.#value)
        break
      default:
        throw new Error(`Unknown data type ${this.#type}`)
    }

    return result
  }
}

export class CommonSetSettingResponse extends Response {
  get value() {
    return this.payload
  }
}
