import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { Admin } from './admin.model';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'mySecretKey', 
      signOptions: { expiresIn: '10h' }
    }),
    TypeOrmModule.forFeature([Admin])
  ],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService]
})
export class AdminModule {}
