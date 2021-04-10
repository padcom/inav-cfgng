import { Request } from '../Request'
import { Response } from '../Response'

export const MSP2_INAV_OSD_LAYOUTS = 0x2012

export class InavOsdLayoutsRequest extends Request {
  #layout = null

  constructor(layout) {
    super(MSP2_INAV_OSD_LAYOUTS)
    this.#layout = layout
  }

  get payload() {
    const result = []
    result.push8(this.#layout)
    
    return result;
  }
}

export class InavOsdLayoutsResponse extends Response {
  get count() {
    return this.payload.byteLength / 2
  }

  get items() {
    const result = []
    for (let i = 0; i < this.count; i++) {
      const bits = this.getUint16(i * 2, true)
      const isVisible = (bits & 0x0800) !== 0
      const line = (bits >> 5) & 0x001F
      const column = bits & 0x001F
      result.push({ bits, isVisible, line, column })
    }
    return result
  }
}
