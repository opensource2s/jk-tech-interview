import { IsEmail, IsNotEmpty, IsNumber, IsPhoneNumber, IsString, Length, Matches, Max, Min, IsEnum, IsOptional } from "class-validator";
import { Column, CreateDateColumn, Entity, Int32, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Optional, UploadedFile } from "@nestjs/common";

export enum UploadStatus {
    SUCCESS = 'success',
    FAILED = 'failed',
    PENDING = 'pending',
  }

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: string;

    @Column({type: "varchar", length: 30})
    fullName: string

    @Column({type: "varchar", length: 30, unique: true})
    userName: string

    @Column({type: "varchar", length: 15})
    password: string

    @Column({type: "varchar", length: 30, unique: true})
    email: string

    @Column({type: "varchar", length: 10, unique: true})
    phone: string

    @Column({ type: 'int' })
    age: number

    @CreateDateColumn()
    createdAt : Date

    @Column()
    @Optional()
    files: Object
  }


@Entity('uploads')
export class UploadFile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @Column({ type: 'bytea', nullable: true }) // For storing file data
  file?: Buffer;

  @Column({ type: 'enum', enum: UploadStatus, default: UploadStatus.PENDING })
  uploadStatus: UploadStatus;
}

export class CreateUserDto {
    @ApiProperty()
    @IsNotEmpty()
    id: string

    @ApiProperty({ example: 'qwert' })
    @IsNotEmpty()
    @IsString()
    fullName: string

    @ApiProperty({ example: 'qwert' })
    @IsNotEmpty()
    @IsString()
    userName: string

    @ApiProperty({ 
      example: 'Qwert#123',
      description: 'Password must be 8-15 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    })
    @IsNotEmpty()
    @IsString()
    @Length(8, 15)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/)
    password: string

    @ApiProperty({ example: 'qwert@gmail.com' })
    @IsNotEmpty()
    @IsString()
    @IsEmail({}, { message: 'Invalid email format' })
    email: string

    @ApiProperty({ example: '1234567890' })
    @IsPhoneNumber()
    @IsString()
    @Length(10, 10, { message: 'Phone number must be exactly 10 digits' })
    @Matches(/^[0-9]{10}$/, { message: 'Phone number must contain only digits' })
    phone: string

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber({}, { message: 'Age must be a valid number' })
    @Min(18, { message: 'Age must be at least 18' }) // Minimum age validation
    @Max(100, { message: 'Age must be at most 100' })
    age: number

    @ApiProperty()
    createdAt : Date

    @ApiProperty()
    files : Object
}

export class UpdateUserDto {
    
    @IsNotEmpty()
    @IsString()
    fullName?: string

    @ApiProperty({ example: 'qwert' })
    @IsNotEmpty()
    @IsString()
    userName?: string

    @ApiProperty({ example: 'qwert#123' })
    @IsNotEmpty()
    @IsString()
    password?: string

    @ApiProperty({ example: 'qwert@gmail.com' })
    @IsNotEmpty()
    @IsEmail()
    email?: string

    @ApiProperty({example: '1234567890'})
    @IsPhoneNumber()
    phone?: string

    @ApiProperty()
    @IsNumber()
    age?: number
}

export class UserLoginDto {

    @ApiProperty({ example: 'qwert' })
    @IsNotEmpty()
    @IsString()
    userName?: string

    @ApiProperty({ example: 'qwert#123' })
    @IsNotEmpty()
    @IsString()
    password?: string

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