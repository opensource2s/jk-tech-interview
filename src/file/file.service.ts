import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UploadFile, UploadStatus } from './file.model';

@Injectable()
export class FileService {
    constructor(
        @InjectRepository(UploadFile)
        private readonly uploadFileRepository: Repository<UploadFile>,
      ) {}
    
      // Function to upload a file
      async uploadFile(filename: string): Promise<{ message: string; status: UploadStatus }> {
        try {
          const fileRecord = this.uploadFileRepository.create({ filename, uploadStatus: UploadStatus.SUCCESS });
          await this.uploadFileRepository.save(fileRecord);
    
          return { message: 'File uploaded successfully', status: UploadStatus.SUCCESS };
        } catch (error) {
          return { message: 'File upload failed', status: UploadStatus.FAILED };
        }
      }
    
      // Function to get upload file status by filename
      async getUploadStatus(filename: string): Promise<{ filename: string; status: UploadStatus }> {
        const fileRecord = await this.uploadFileRepository.findOne({ where: { filename } });
    
        if (!fileRecord) {
          return { filename, status: UploadStatus.FAILED };
        }
    
        return { filename: fileRecord.filename, status: fileRecord.uploadStatus };
      }
}
