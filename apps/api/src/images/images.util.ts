import axios from 'axios'
import { encode } from 'blurhash'
import sharp from 'sharp'

export const generateBlurhashFromBuffer = async (
  imageFileBuffer: Buffer,
): Promise<string> => {
  const componentX = 4
  const componentY = 4
  const { data: forBlurhash, info } = await sharp(imageFileBuffer)
    .flatten({ background: '#FFFFFF' })
    .resize(componentX * 5, componentY * 5, {
      fit: sharp.fit.cover,
    })
    .clone()
    .raw()
    .ensureAlpha()
    .toBuffer({ resolveWithObject: true })

  return encode(
    new Uint8ClampedArray(forBlurhash),
    info.width,
    info.height,
    componentX,
    componentY,
  )
}

export const generateBlurhashFromURL = async (url: string): Promise<string> => {
  const { data } = await axios.get(url, {
    responseType: 'arraybuffer',
  })
  const buffer = Buffer.from(data, 'utf-8')
  return generateBlurhashFromBuffer(buffer)
}
