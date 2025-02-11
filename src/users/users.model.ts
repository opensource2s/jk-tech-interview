import { IsEmail, IsNotEmpty, IsNumber, IsPhoneNumber, IsString, Length, Matches, Max, Min } from "class-validator";
import { Column, CreateDateColumn, Entity, Int32, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

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

    @Column({type: "number"})
    age: Int32

    @CreateDateColumn()
    createdAt : Date
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

    @ApiProperty({ example: 'qwert#123' })
    @IsNotEmpty()
    @IsString()
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