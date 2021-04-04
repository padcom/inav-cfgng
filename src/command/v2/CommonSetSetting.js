import { Request } from '../Request'
import { Response } from '../Response'

import { DATA_TYPE } from '../../models/data-type'

export const MSP2_COMMON_SET_SETTING = 0x1004

export class CommonSetSettingRequest extends Request {
  #name = null
  #type = null
  #value = null

  constructor(name, type, value) {
    super(MSP2_COMMON_SET_SETTING)
    this.#name = name
    this.#type = type
    this.#value = value
  }

  get payload() {
    const result = []
    result.pushString(this.#name)
    switch (this.#type) {
      case DATA_TYPE.UINT8:
      case DATA_TYPE.INT8:
      case DATA_TYPE.LOOKUP:
      case DATA_TYPE.BOOL:
        result.push8(this.#value)
        break
      case DATA_TYPE.UINT16:
      case DATA_TYPE.INT16:
        result.push16(this.#value)
        break
      case DATA_TYPE.UINT32:
      case DATA_TYPE.INT32:
        result.push32(this.#value)
        break
      case DATA_TYPE.FLOAT:
        result.pushFloat(this.#value)
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
