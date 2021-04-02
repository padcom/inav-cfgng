import { Request } from '../Request'
import { Response } from '../Response'

export const MSP_EEPROM_WRITE = 250

export class EepromWriteRequest extends Request {
  constructor() {
    super(MSP_EEPROM_WRITE)
  }
}

export class EepromWriteResponse extends Response {
}
