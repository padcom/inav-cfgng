import { ref } from 'vue'
import { Logger } from '../logger'
import { FONT } from '../models/font'

const font = ref([])
const log  = Logger.getLogger('FONT')

async function loadFont(name) {
  const data = await fetch(`images/font/${name}.mcm`)
    .then(response => response.text())
    .then(data => data.split('\n').map(line => line.trim()))
  
  if (data[0] !== 'MAX7456') {
    log.error('Invalid font file', name)
  }

  font.value = []  

  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  canvas.width = 12
  canvas.height = 18

  const COLORS = {
    0: 'rgba(0, 0, 0, 1)',
    1: 'rgba(255, 255, 255, 0)',
    2: 'rgba(255,255,255, 1)'
  }

  function drawChar(pixels) {
    context.clearRect(0, 0, canvas.width, canvas.height)
    for (let x = 0; x < 12; x++) {
      for (let y = 0; y < 18; y++) {
        context.fillStyle = COLORS[pixels[y * 12 + x]]
        context.fillRect(x, y, 1, 1)
      }
    }
    return canvas.toDataURL('image/png')
  }

  let char = []
  for (let line = 1; line < data.length; line++) {
    data[line]
      .match(/.{1,2}/g)                       // split into 2-char strings (each pixel is 2 bits)
      .map(bits => Number.parseInt(bits, 2))  // convert into number from 0-3
      .forEach(pixel => { char.push(pixel) }) // push each pixel to the character

    if (char.length == 256) {                 // each character is built from 256 pixels
      font.value.push(drawChar(char))         // draw character and convert it to inline data for img src
      char = []                               // empty character data
    }
  }

  log.info('Font', `"${name}"`, 'loaded')
}

export function useFont() {
  return { font, loadFont }
}
