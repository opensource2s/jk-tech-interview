import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './admin.model'; 
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(Admin)
        private adminReposiroty: Repository<Admin>,
        private readonly jwtService: JwtService 
    ) {}

    async getAdminByUsername(username: string) {
        const admin = await this.adminReposiroty.findOne({ where: { userName: username } })
        return admin;
    }

    async validateAdmin(username, password) {
        const admin = await this.getAdminByUsername(username);
        if(!admin) throw new NotFoundException('User not found');
    
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if(!isPasswordValid) throw new UnauthorizedException('Invalid password');
        
        return admin;
      }
    

    async login(username: string, password: string) {
        const admin = await this.validateAdmin(username, password);
        if(!admin) throw new UnauthorizedException('Invalid username or password')
    
        const payload = { username: username, sub: admin.id}
        const token = this.jwtService.sign(payload);
        
        return {  
          message: 'Login successful',
          access_token: token
        }
      }

}



