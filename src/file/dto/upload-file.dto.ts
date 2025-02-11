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
    description: 'File data as a buffer (only used if storing in DB)',
    type: 'string',
    format: 'binary',
  })
  @IsOptional()
  file?: Buffer;

  @ApiProperty({
    description: 'Status of the upload',
    example: UploadStatus.SUCCESS,
    enum: UploadStatus,
  })
  @IsEnum(UploadStatus)
  @IsOptional()
  uploadStatus?: UploadStatus;
}
