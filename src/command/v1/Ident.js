import { Request } from '../Request'
import { Response } from '../Response'
import { getKeyForValue } from '../../utils'

export const MSP_IDENT = 100

export class IdentRequest extends Request {
  constructor() {
    super(MSP_IDENT)
  }
}

export const MILTITYPES = {
  TRI:           1,  // Tricopter
  QUADP:         2,  // Quadrocopter +
  QUADX:         3,  // Quadrocopter X
  BI:            4,
  GIMBAL:        5,
  Y6:            6,
  HEX6:          7,
  FLYING_WING:   8,
  Y4:            9,
  HEX6X:         10,
  OCTOX8:        11, // Java GUI is same for the next 3 configs
  OCTOFLATP:     12, // MultiWinGui shows this differently
  OCTOFLATX:     13, // MultiWinGui shows this differently
  AIRPLANE:      14,
  SINGLECOPTER:  14,
  DUALCOPTER:    14,
  HELI_120_CCPM: 15,
  HELI_90_DEG:   16,
  VTAIL4:        17,
  HEX6H:         18,
}

export class IdentResponse extends Response {
  get version() {
    return parseFloat(this.getUint8(0) / 100).toFixed(2)
  }

  get multiType() {
    return this.getUint8(1)
  }

  get multiTypeStr() {
    const type = getKeyForValue(MILTITYPES, this.multiType)
    return type ? type[0] : 'unknown'
  }

  get mspVersion() {
    return this.getUint8(2)
  }

  get capability() {
    return this.getUint32(3, true)
  }
}
