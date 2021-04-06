import { Request } from '../Request'
import { Response } from '../Response'

export const MSP_BOXNAMES = 116

export class BoxNamesRequest extends Request {
  constructor() {
    super(MSP_BOXNAMES)
  }
}

export class BoxNamesResponse extends Response {
  get count() {
    return this.names.length
  }

  get names() {
    const result = []
    let buff = []
    for (let i = 0; i < this.payload.byteLength; i++) {
      if (this.getUint8(i) == 0x3B) { // ; (delimeter char)
        // convert bytes into ASCII and save as strings
        result.push(String.fromCharCode.apply(null, buff))

        // empty buffer
        buff = [];
      } else {
          buff.push(this.getUint8(i));
      }
    }

    return result
  }
}
