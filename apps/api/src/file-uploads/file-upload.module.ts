import { Module } from '@nestjs/common'

import { ImageModule } from '../images/image.module'
import { FileUploadController } from './file-upload.controller'
import { FileUploadService } from './file-upload.service'

@Module({
  imports: [ImageModule],
  controllers: [FileUploadController],
  providers: [FileUploadService],
})
export class FileUploadModule {}
