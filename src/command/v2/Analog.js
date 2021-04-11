import { Request } from '../Request'
import { Response } from '../Response'

export const MSP2_INAV_ANALOG = 0x2002

export class AnalogRequest extends Request {
  constructor() {
    super(MSP2_INAV_ANALOG)
  }
}

export const BATTERY_FLAG = {
  WAS_FULLY_CHARGED       : 1,
  USES_CAPACITY_THRESHOLDS: 2,
}

export const BATTERY_STATE_FLAG = {
  OK         : 0,
  WARNING    : 1,
  CRITICAL   : 2,
  NOT_PRESENT: 3,
}

export class AnalogResponse extends Response {
  get batteryFlags() {
    return this.getUint8(0)
  }

  get batteryState() {
    return (this.batteryFlags >> 2) & 3
  }

  get batteryCellCount() {
    return this.batteryFlags >> 4 
  }

  get batteryVoltage() {
    return this.getUint16(1, true) / 100
  }

  get amperage() {
    return this.getUint16(3, true) / 100
  }

  get power() {
    return this.getUint32(5, true) / 100
  }

  get mahDrawn() {
    return this.getUint32(9, true)
  }

  get mwhDrawn() {
    return this.getUint32(13, true)
  }

  get batteryRemainingCapacity() {
    return this.getUint32(17, true)
  }

  get calculateBatteryPercentage() {
    return this.getUint8(21)
  }

  get rssi() {
    return this.getUint16(22, true) / 10
  }
}
