import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { encode } from 'blurhash'
import { firstValueFrom } from 'rxjs'
import * as sharp from 'sharp'
import { Image } from 'src/images/entities/image.entity'
import { Repository } from 'typeorm'

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepo: Repository<Image>,
    private readonly httpService: HttpService,
  ) {}

  private async generateBlurhashFromBuffer(
    imageFileBuffer: Buffer,
  ): Promise<string> {
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

  private async generateBlurhashFromURL(url: string): Promise<string> {
    const observable = this.httpService.get(url, {
      responseType: 'arraybuffer',
    })
    const { data } = await firstValueFrom(observable)
    const buffer = Buffer.from(data, 'utf-8')
    return this.generateBlurhashFromBuffer(buffer)
  }

  getOrCreateImages(imageUrls: string[]): Promise<Image[]> {
    return Promise.all<Image>(
      imageUrls.map(async url => {
        const image = await this.imageRepo.findOneBy({ url })
        if (image) {
          return image
        }
        const blurhash = await this.generateBlurhashFromURL(url)
        return this.imageRepo.save(this.imageRepo.create({ url, blurhash }))
      }),
    )
  }

  async saveImage(file: Express.Multer.File, url: string): Promise<Image> {
    const blurhash = await this.generateBlurhashFromBuffer(file.buffer)
    const image = this.imageRepo.create({ blurhash, url })
    return this.imageRepo.save(image)
  }
}
