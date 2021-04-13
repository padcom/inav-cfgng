import { Request } from '../Request'
import { Response } from '../Response'
import { DATA_TYPE } from '../../models/data-type'

export const MSP2_COMMON_SETTING = 0x1003

export class CommonSettingRequest extends Request {
  #name = null

  constructor(name) {
    super(MSP2_COMMON_SETTING)
    this.#name = name
  }

  get payload() {
    const result = []
    result.pushString(this.#name)

    return result
  }
}

export class CommonSettingResponse extends Response {
  get length() {
    return this.payload.byteLength
  }

  get unsignedType() {
    if (this.payload.byteLength === 1) {
      return DATA_TYPE.UINT8
    } else if (this.payload.byteLength === 2) {
      return DATA_TYPE.UINT16
    } else if (this.payload.byteLength === 4) {
      return DATA_TYPE.UINT32
    } else {
      return DATA_TYPE.UNKNOWN
    }
  }

  get unsigned() {
    if (this.payload.byteLength === 1) {
      return this.getUint8(0)
    } else if (this.payload.byteLength === 2) {
      return this.getUint16(0, true)
    } else if (this.payload.byteLength === 4) {
      return this.getUint32(0, true)
    } else {
      throw new Error('Unknown value length')
    }
  }

  get signedType() {
    if (this.payload.byteLength === 1) {
      return DATA_TYPE.INT8
    } else if (this.payload.byteLength === 2) {
      return DATA_TYPE.INT16
    } else if (this.payload.byteLength === 4) {
      return DATA_TYPE.INT32
    } else {
      return DATA_TYPE.UNKNOWN
    }
  }

  get signed() {
    if (this.payload.byteLength === 1) {
      return this.getInt8(0)
    } else if (this.payload.byteLength === 2) {
      return this.getInt16(0, true)
    } else if (this.payload.byteLength === 4) {
      return this.getInt32(0, true)
    } else {
      throw new Error('Unknown value length')
    }
  }

  get float() {
    if (this.payload.byteLength === 4) {
      return this.getFloat32(0, true)
    } else if (this.payload.byteLength === 8) {
      return this.getFloat64(0, true)
    } else {
      throw new Error('Unknown value length')
    }
  }

  get string() {
    return this.getString(0)
  }
}
