import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto, UserLoginDto } from './users.model';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Post()
    async login(@Body() userLoginDto: UserLoginDto) {
        const { userName, password } = userLoginDto;
        return await this.userService.login(JSON.stringify(userName), JSON.stringify(password));        
    }

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        
        let getUserByUsername = await this.userService.getUserByUsername(JSON.stringify(createUserDto['userName']));
        if(getUserByUsername) throw new BadRequestException('Username already exists');

        let getUserByPhoneNumber = await this.userService.getUserByPhoneNumber(JSON.stringify(createUserDto['phone']))
        if(getUserByPhoneNumber) throw new BadRequestException('Phonenumber already exists');

        let getUserByEmail = await this.userService.getUserByEmail(JSON.stringify(createUserDto['email']));
        if(getUserByEmail) throw new BadRequestException('Email already exists');

        return await this.userService.createUser(createUserDto);
    }

    @Get()
    async findAll() {
        return await this.userService.getUsers();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.userService.getUser(id);
    }

    @Put(':id')
    async completeUpdate(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return await this.userService.updateUser(id, updateUserDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.userService.deleteUser(id);
  }
}
