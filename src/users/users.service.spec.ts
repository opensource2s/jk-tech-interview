import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from './users.model';
import { CreateUserDto } from './users.model';
import * as bcrypt from 'bcrypt';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<User>;
  let jwtService: JwtService;

  const mockUserRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest.fn().mockImplementation(async (user) => ({
      ...user,
      id: '123',
    })),
    findOne: jest.fn().mockImplementation(async ({ where }) => {
      if (where.userName === 'existingUser') {
        return {
          id: '123',
          userName: 'existingUser',
          password: await bcrypt.hash('ValidPass#1', 10),
        };
      }
      return null;
    }),
  };

  const mockJwtService = {
    sign: jest.fn().mockReturnValue('mocked-jwt-token'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    it('should create and return a new user', async () => {
      const createUserDto: CreateUserDto = {
        id: '123',
        fullName: 'Test User',
        userName: 'testuser',
        password: 'ValidPass#1',
        email: 'test@example.com',
        phone: '1234567890',
        age: 25,
        createdAt: new Date(),
        files: {},
      };

      const result = await service.createUser(createUserDto);
      expect(result).toHaveProperty('id', '123');
      expect(userRepository.create).toHaveBeenCalledWith(createUserDto);
      expect(userRepository.save).toHaveBeenCalled();
    });
  });

  describe('validateUser', () => {
    it('should return user if username and password are valid', async () => {
      const result = await service.validateUser('existingUser', 'ValidPass#1');
      expect(result).toHaveProperty('userName', 'existingUser');
    });

    it('should throw NotFoundException if user is not found', async () => {
      await expect(service.validateUser('nonExistentUser', 'password')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw UnauthorizedException if password is incorrect', async () => {
      await expect(service.validateUser('existingUser', 'WrongPass#1')).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('login', () => {
    it('should return access token for valid credentials', async () => {
      const result = await service.login('existingUser', 'ValidPass#1');
      expect(result).toEqual({
        message: 'Login successful',
        access_token: 'mocked-jwt-token',
      });
      expect(jwtService.sign).toHaveBeenCalled();
    });

    it('should throw UnauthorizedException for invalid credentials', async () => {
      await expect(service.login('nonExistentUser', 'password')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('getUserByUsername', () => {
    it('should return a user if found', async () => {
      const result = await service.getUserByUsername('existingUser');
      expect(result).toHaveProperty('userName', 'existingUser');
    });

    it('should return null if user is not found', async () => {
      const result = await service.getUserByUsername('nonExistentUser');
      expect(result).toBeNull();
    });
  });
});
