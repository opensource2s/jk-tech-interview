import { Controller,Post, UploadedFile, UseInterceptors, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadFileDto, UploadStatus } from './dto/upload-file.dto';

@Controller('file')
export class FileController {
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body: UploadFileDto) {
    if (!file) {
      return {
        message: 'File upload failed',
        filename: body.filename || 'N/A',
        uploadStatus: UploadStatus.FAILED,
      };
    }

    return {
      message: 'File uploaded successfully',
      filename: file.originalname,
      size: file.size,
      uploadStatus: UploadStatus.SUCCESS,
    };
  }
}
