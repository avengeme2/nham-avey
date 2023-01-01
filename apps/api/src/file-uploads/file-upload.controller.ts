import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiConsumes, ApiOperation, ApiSecurity } from '@nestjs/swagger'

import { ApiFileBody } from '../common/api-file-body.decorator'
import { API_KEY_NAME, FILE_KEY } from '../common/constants/common.constants'
import { FileUploadService } from './file-upload.service'

@ApiSecurity(API_KEY_NAME)
@Controller('upload')
export class FileUploadController {
  constructor(private readonly fileUploadsService: FileUploadService) {}

  @ApiOperation({
    summary: 'Upload file',
  })
  @ApiFileBody({
    key: FILE_KEY,
    required: true,
  })
  @ApiConsumes('multipart/form-data')
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile()
    file: Express.Multer.File,
  ): Promise<string> {
    return this.fileUploadsService.upload(file)
  }
}
