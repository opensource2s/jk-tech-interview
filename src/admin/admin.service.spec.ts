import { Test, TestingModule } from '@nestjs/testing';
import { AdminService } from './admin.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './admin.model';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

describe('AdminService', () => {
  let service: AdminService;
  let adminRepository: Repository<Admin>;
  let jwtService: JwtService;

  const mockAdminRepository = {
    findOne: jest.fn().mockImplementation(async ({ where }) => {
      if (where.userName === 'adminUser') {
        return {
          id: '123',
          userName: 'adminUser',
          password: await bcrypt.hash('AdminPass#1', 10),
        };
      }
      return null;
    }),
  };

  const mockJwtService = {
    sign: jest.fn().mockReturnValue('mocked-admin-jwt-token'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminService,
        {
          provide: getRepositoryToken(Admin),
          useValue: mockAdminRepository,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AdminService>(AdminService);
    adminRepository = module.get<Repository<Admin>>(getRepositoryToken(Admin));
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAdminByUsername', () => {
    it('should return an admin if found', async () => {
      const result = await service.getAdminByUsername('adminUser');
      expect(result).toHaveProperty('userName', 'adminUser');
    });

    it('should return null if admin is not found', async () => {
      const result = await service.getAdminByUsername('unknownUser');
      expect(result).toBeNull();
    });
  });

  describe('validateAdmin', () => {
    it('should return admin if username and password are valid', async () => {
      const result = await service.validateAdmin('adminUser', 'AdminPass#1');
      expect(result).toHaveProperty('userName', 'adminUser');
    });

    it('should throw NotFoundException if admin is not found', async () => {
      await expect(service.validateAdmin('unknownUser', 'password')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw UnauthorizedException if password is incorrect', async () => {
      await expect(service.validateAdmin('adminUser', 'WrongPass#1')).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('login', () => {
    it('should return access token for valid credentials', async () => {
      const result = await service.login('adminUser', 'AdminPass#1');
      expect(result).toEqual({
        message: 'Login successful',
        access_token: 'mocked-admin-jwt-token',
      });
      expect(jwtService.sign).toHaveBeenCalled();
    });

    it('should throw UnauthorizedException for invalid credentials', async () => {
      await expect(service.login('unknownUser', 'password')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
