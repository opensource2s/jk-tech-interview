import { IsNotEmpty, IsString, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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


@Entity('uploads')
export class UploadFile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @Column({ type: 'enum', enum: UploadStatus, default: UploadStatus.PENDING })
  uploadStatus: UploadStatus;
}
