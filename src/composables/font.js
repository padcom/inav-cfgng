import { ref } from 'vue'
import { FONT } from '../models/font'

const font = ref([])

async function loadImage(src) {
  return new Promise(resolve => {
    const result = document.createElement('img')
    result.onload = () => resolve(result)
    result.src = src
  })
}

async function loadFonts() {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')

  const makeImageTransparent = img => {
    canvas.width = img.width
    canvas.height = img.height
    context.drawImage(img, 0, 0)
    try {
      const imageData = context.getImageData(0, 0, img.width, img.height)  
      for (let i = 0; i < imageData.data.length; i += 4) {
        if (imageData.data[i] === 0x80 && imageData.data[i + 1] === 0x80 && imageData.data[i + 2] === 0x80) {
          imageData.data[i + 3] = 0
        }
      }
      context.clearRect(0, 0, img.width, img.height)
      context.putImageData(imageData, 0, 0)
      return canvas.toDataURL('image/png')
    } catch (e) {
      console.log('Error while converting image', img, e)
      return ''
    }
  }

  for (let i = 0; i < FONT.length; i++) {
    const file = FONT[i]
    const char = file.split('-')[0]
    const image = await loadImage(`./images/font/${file}.png`)
    font.value[Number.parseInt(char)] = makeImageTransparent(image)
  }
}

export function useFont() {
  return { font, loadFonts }
}
