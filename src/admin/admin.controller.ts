import { Controller, Post, Body } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminLoginDto } from './admin.model';

@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService ) {}

    @Post()
    async login(@Body() adminLoginDto: AdminLoginDto) {
        const { userName, password } = adminLoginDto;
        return await this.adminService.login(JSON.stringify(userName), JSON.stringify(password));        
    }
}
