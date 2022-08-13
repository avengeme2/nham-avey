import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { encode } from "blurhash"
import * as sharp from "sharp"
import { Image } from "src/images/entities/image.entity"
import { Repository } from "typeorm"

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepo: Repository<Image>,
  ) {}

  private async generateBlurhash(imageFileBuffer: Buffer) {
    const componentX = 4
    const componentY = 4
    const { data: forBlurhash, info } = await sharp(imageFileBuffer)
      .flatten({ background: "#FFFFFF" })
      .resize(componentX * 5, componentY * 5, {
        fit: sharp.fit.cover,
      })
      .clone()
      .raw()
      .ensureAlpha()
      .toBuffer({ resolveWithObject: true })

    return encode(new Uint8ClampedArray(forBlurhash), info.width, info.height, componentX, componentY)
  }

  async saveImage(file: Express.Multer.File, url: string): Promise<Image> {
    console.time("generate blurhash")
    const blurhash = await this.generateBlurhash(file.buffer)
    const image = this.imageRepo.create({ blurhash, url })
    console.timeEnd("generate blurhash")
    console.time("save image")
    const r = await this.imageRepo.save(image)
    console.timeEnd("save image")
    return r
  }
}
