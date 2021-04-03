import { Request } from '../Request'
import { Response } from '../Response'

import { DATA_TYPE } from '../../models/data-type'

export const MSP2_COMMON_SETTING_INFO = 0x1007

export class CommonSettingInfoRequest extends Request {
  #name = null

  constructor(name) {
    super(MSP2_COMMON_SETTING_INFO)
    this.#name = name
  }

  get payload() {
    const result = []
    result.pushString(this.#name)

    return result
  }
}

const SETTING_SECTION_OFFSET  = 4
const SETTING_MODE_OFFSET     = 6

const MASTER_VALUE            = 0 << SETTING_SECTION_OFFSET
const PROFILE_VALUE           = 1 << SETTING_SECTION_OFFSET
const CONTROL_RATE_VALUE      = 2 << SETTING_SECTION_OFFSET
const BATTERY_CONFIG_VALUE    = 3 << SETTING_SECTION_OFFSET

const MODE_DIRECT             = 0 << SETTING_MODE_OFFSET
const MODE_LOOKUP             = 1 << SETTING_MODE_OFFSET

export class CommonSettingInfoResponse extends Response {
  get name() {
    return this.getString(0)
  }

  get parameterGroupId() {
    return this.getUint16(this.name.length + 1, true)
  }

  get type() {
    return this.getUint8(this.name.length + 3)
  }

  get section() {
    return this.getUint8(this.name.length + 4)
  }

  get isMasterValue() {
    return this.section === MASTER_VALUE
  }

  get isProfileValue() {
    return this.section === PROFILE_VALUE
  }

  get isControlRateValue() {
    return this.section === CONTROL_RATE_VALUE
  }

  get isBatteryConfigValue() {
    return this.section === BATTERY_CONFIG_VALUE
  }
  
  get mode() {
    return this.getUint8(this.name.length + 5)
  }

  get isDirectMode() {
    return this.mode === MODE_DIRECT
  }

  get isLookupMode() {
    return this.mode === MODE_LOOKUP
  }

  get min() {
    return this.getInt32(this.name.length + 6, true)
  }

  get max() {
    return this.getUint32(this.name.length + 10, true)
  }

  get index() {
    return this.getUint16(this.name.length + 14, true)
  }

  get profileValue() {
    return this.getUint8(this.name.length + 16)
  }

  get profileCount() {
    return this.getUint8(this.name.length + 17)
  }

  get values() {
    const result = []
    if (this.isLookupMode) {
      let offset = this.name.length + 18
      for (let i = this.min; i < this.max; i++) {
        const value = this.getString(offset)
        offset += value.length + 1
        result.push(value)
      }
    }

    return result
  }

  get value() {
    if (this.type === undefined) {
      return undefined
    }
    switch (this.type) {
      case DATA_TYPE.INT8:
        return this.getInt8(this.payload.byteLength - 1)
      case DATA_TYPE.UINT8:
        return this.getUint8(this.payload.byteLength - 1)
      case DATA_TYPE.INT16:
        return this.getInt16(this.payload.byteLength - 2, true)
      case DATA_TYPE.UINT16:
        return this.getUint16(this.payload.byteLength - 2, true)
      case DATA_TYPE.UINT32:
        return this.getUint32(this.payload.byteLength - 4, true)
      case DATA_TYPE.FLOAT:
        return this.getFloat32(this.payload.byteLength - 4, true)
      case DATA_TYPE.STRING:
        const valuesLength = this.values.map(value => value.length + 1).reduce((acc, length) => acc + length, 0)
        const offset = this.name.length + 18 + valuesLength
        return this.getString(offset)
      default:
        throw new Error(`Unknown value type ${this.type}`)
    }
  }
}
