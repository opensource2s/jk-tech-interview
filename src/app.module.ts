import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AdminModule } from './admin/admin.module';
import { AdminController } from './admin/admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.model';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'qwert@123',
      entities: [User],
      database: 'myApp',
      synchronize: true,
      logging: true
    }),
    AdminModule, UsersModule],
    controllers: [AppController, AdminController],
    providers: [AppService],
})
export class AppModule {}

