import { Controller,Post,Get, Body, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { UploadFileDto, UploadStatus } from './file.model';

@Controller('file')
export class FileController {
    constructor(private readonly fileService: FileService) {}

    // Endpoint to upload a file
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() uploadFileDto: UploadFileDto) {
      if (!file) {
        return { message: 'File upload failed', status: 'failed' };
      }
      return this.fileService.uploadFile(file.originalname);
    }
  
    // Endpoint to check file upload status
    @Get('status')
    async getUploadStatus(@Query('filename') filename: string) {
      return this.fileService.getUploadStatus(filename);
    }
}
