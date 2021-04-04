import { Buffer } from 'buffer'
window.Buffer = Buffer

if (!Array.prototype.push8) {
  Array.prototype.push8 = function(val) {
    this.push(0xFF & val)
    return this
  }
}

if (!Array.prototype.push16) {
    Array.prototype.push16 = function(val) {
    this.push8(val)
    this.push8(val >> 8)
    return this
  }
}

if (!Array.prototype.push32) {
  Array.prototype.push32 = function(val) {
    this.push8(val)
    this.push8(val >> 8)
    this.push8(val >> 16)
    this.push8(val >> 24)
    return this
  }
}

if (!Array.prototype.pushFloat) {
  Array.prototype.pushFloat = function(val) {
    const buffer = new DataView(new Uint8Array(4).buffer)
    buffer.setFloat32(0, val, true)
    this.push8(buffer.getUint8(0))
    this.push8(buffer.getUint8(1))
    this.push8(buffer.getUint8(2))
    this.push8(buffer.getUint8(3))
    return this
  }
}

if (!Array.prototype.pushString) {
  Array.prototype.pushString = function(val) {
    for (let i = 0; i < val.length; i++) {
      this.push8(val.charCodeAt(i))
    }
    this.push8(0)
    return this
  }
}

if (!Array.prototype.toBuffer) {
  Array.prototype.toBuffer = function() {
    return Buffer.from(this)
  }
}

if (!Array.prototype.toArrayBuffer) {
  Array.prototype.toArrayBuffer = function() {
    const result = new ArrayBuffer(this.length)
    const view = new Uint8Array(result)
    for (let i = 0; i < this.length; i++) {
      view[i] = this[i]
    }
    return result
  }
}

if (!Array.prototype.toDataView) {
  Array.prototype.toDataView = function(offset, length) {
    return new DataView(this.toArrayBuffer(), offset, length)
  }
}
