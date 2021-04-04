import { Request } from '../Request'
import { Response } from '../Response'

export const MSP_ANALOG = 110

export class AnalogRequest extends Request {
  constructor() {
    super(MSP_ANALOG)
  }
}

export class AnalogResponse extends Response {
  get voltage() {
    return this.getUint8(0) / 10.0 // V
  }

  get mAhDrawn() {
    return this.getUint16(1, true) // mAh
  }

  get rssi() {
    return this.getUint16(3, true) // 0-1023
  }

  get current() {
    return this.getInt16(5, true) / 100 // A
  }
}
