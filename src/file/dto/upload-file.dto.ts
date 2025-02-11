import { IsNotEmpty, IsString, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum UploadStatus {
  SUCCESS = 'success',
  FAILED = 'failed',
  PENDING = 'pending',
}

export class UploadFileDto {
  @ApiProperty({ description: 'File name', example: 'document.pdf' })
  @IsString()
  @IsNotEmpty()
  filename: string;

  @ApiProperty({
    description: 'Status of the upload',
    example: UploadStatus.SUCCESS,
    enum: UploadStatus,
  })
  @IsEnum(UploadStatus)
  @IsOptional()
  uploadStatus?: UploadStatus;
}
