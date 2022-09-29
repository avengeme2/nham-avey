import { Module } from '@nestjs/common'

import { ImagesModule } from '../images/images.module'
import { FileUploadsController } from './file-uploads.controller'
import { FileUploadsService } from './file-uploads.service'

@Module({
  imports: [ImagesModule],
  controllers: [FileUploadsController],
  providers: [FileUploadsService],
})
export class FileUploadsModule {}
