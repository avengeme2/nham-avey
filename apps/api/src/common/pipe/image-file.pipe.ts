import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common'
import { getFileExtension } from 'src/common/common.helpers'
import { imageExtensions } from 'src/common/constants/image-extension.constant'

const DEFAULT_MAX_FILE_SIZE = 10 * 1024 * 1024

@Injectable()
export class ImageFilePipe
  implements PipeTransform<Express.Multer.File, Express.Multer.File>
{
  private readonly required: boolean
  private readonly maxFileSize: number

  constructor({ required = true, maxFileSize = DEFAULT_MAX_FILE_SIZE }) {
    this.required = required
    this.maxFileSize = maxFileSize
  }

  transform(
    value: Express.Multer.File,
    _metadata: ArgumentMetadata,
  ): Express.Multer.File {
    if (this.required && !value) {
      throw new BadRequestException('File is required')
    }

    if (value) {
      if (value.size > DEFAULT_MAX_FILE_SIZE) {
        throw new BadRequestException(
          `File size is too big, max size is ${this.maxFileSize} bytes`,
        )
      }
      const fileExtension = getFileExtension(value.originalname)
      if (!imageExtensions.has(fileExtension)) {
        throw new BadRequestException('File type is not allowed')
      }
    }

    return value
  }
}
