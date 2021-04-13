import { Request } from '../Request'
import { Response } from '../Response'

export const MSP2_INAV_OSD_SET_LAYOUT_ITEM = 0x2013

export class InavOsdSetLayoutItemRequest extends Request {
  #layout = null
  #item = null
  #visible = null
  #column = null
  #line = null

  constructor(layout, item, visible, column, line) {
    super(MSP2_INAV_OSD_SET_LAYOUT_ITEM)
    this.#layout = layout
    this.#item = item
    this.#visible = visible
    this.#column = column
    this.#line = line
  }

  get payload() {
    const result = []
    result.push8(this.#layout)
    result.push8(this.#item)
    result.push16(this.#position)
    
    return result;
  }

  get #position() {
    const visible = this.#visible ? 0x0800 : 0
    const line = this.#line << 5
    const column = this.#column
    return visible | line | column
  }
}

export class InavOsdSetLayoutItemResponse extends Response {
}
