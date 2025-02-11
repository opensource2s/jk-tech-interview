import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.model';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({dest: './uploads'}),
    PassportModule,
    JwtModule.register({
      secret: 'mySecretKey', 
      signOptions: { expiresIn: '5h' }
    }),
    TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
