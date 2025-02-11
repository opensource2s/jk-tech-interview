import { IsEmail, IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from "class-validator";
import { Column, Entity, Int32, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";


@Entity()
export class Admin {

    @PrimaryGeneratedColumn()
    id: string;

    @Column({type: "varchar", length: 30})
    userName: string

    @Column({type: "varchar", length: 30})
    email: string

    @Column({type: "varchar", length: 15})
    password: string
}

export class AdminLoginDto {
    
    @ApiProperty({ example: 'qwert' })
    @IsNotEmpty()
    @IsString()
    userName: string

    @ApiProperty({ example: 'qwert#123' })
    @IsNotEmpty()
    @IsString()
    password: string
    
}