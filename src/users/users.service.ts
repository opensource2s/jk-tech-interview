import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.model';
import { CreateUserDto, UpdateUserDto } from './users.model';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private readonly jwtService: JwtService
    ) {}

  async createUser(createUserDto: CreateUserDto) {
    try {
      const user = this.userRepository.create(createUserDto);
      return await this.userRepository.save(user);
    } catch(error) {
      console.log(error);
      throw error;
    }
    
  }

  async validateUser(username, password) {
    const user = await this.getUserByUsername(username);
    if(!user) throw new NotFoundException('User not found');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) throw new UnauthorizedException('Invalid password');
    
    return user;
  }

  async login(username: string, password: string) {
    const user = await this.validateUser(username, password);
    if(!user) throw new UnauthorizedException('Invalid username or password')

    const payload = { username: username, sub: user.id}
    const token = this.jwtService.sign(payload);
    
    return {
      message: 'Login successful',
      access_token: token
    }
  }

  async getUsers() {
    return await this.userRepository.find();
  }

  async getUserByUsername(username: string) {
    const user = await this.userRepository.findOne({ where: { userName: username } })
    return user;
  }

  async getUserByPhoneNumber(phoneNumber: string) {
    const user = await this.userRepository.findOne({ where: { phone: phoneNumber } })
    return user
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email: email } })
    return user;
  }

  async getUser(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    return user;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.getUser(id); 
    if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
    Object.assign(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  async deleteUser(id: string) {
    const user = await this.getUser(id); 
    await this.userRepository.remove(user);
  }
}
