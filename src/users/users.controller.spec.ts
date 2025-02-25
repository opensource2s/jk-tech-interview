
// import { Test } from '@nestjs/testing';
// import { UsersController } from './users.controller';
// import { UsersService } from './users.service';
// import { CreateUserDto } from './users.model';
// import { JwtService } from '@nestjs/jwt';

// describe('UsersController', () => {
//   let userController: UsersController;
//   let userService: UsersService;

//   const mockUserRepository = {
//     create: jest.fn(),
//     save: jest.fn(),
//     findOne: jest.fn(),
//   };
//   const mockJwtService = {
//     sign: jest.fn().mockReturnValue('mocked-jwt-token'),
//   };

//   beforeEach(async () => {
//     const moduleRef = await Test.createTestingModule({
//         controllers: [UsersController],
//         providers: [UsersService,
//           { provide: 'UserRepository', useValue: mockUserRepository },
//           { provide: JwtService, useValue: mockJwtService },
//         ],
//       }).compile();

//     userService = moduleRef.get(UsersService);
//     userController = moduleRef.get(UsersController);
//   });

//   it('should be defined', () => {
//     expect(userService).toBeDefined();
//   });

//   describe('createUser', () => {
//       it('should create and return a user', async () => {
//         const createUserDto: CreateUserDto = {
//           id: '1',
//           fullName: 'siva',
//           userName: 'siva@123',
//           password: 'pasa@123',
//           email: 'siva99@gmail.com',
//           phone: '1234567890',
//           age: Number(25),
//           createdAt:new Date(),
//           files:{}
//         };
  
//         jest.spyOn(userService, 'createUser').mockResolvedValue(createUserDto);
//         const result = await userService.createUser(createUserDto);
//         expect(result).toEqual(createUserDto);
  
//       });
  
//       it('should validate if email is already taken', async () => {
//         const createUserDto: CreateUserDto = {
//           id: '3',
//           fullName: 'harish',
//           userName: 'harish155',
//           password: 'pass@456',
//           email: 'harish155@gmail.com',
//           phone: '1231231234',
//           age: 27,
//           createdAt:new Date(),
//           files:{}
//         };
  
//         //jest.spyOn(userRepository, 'findOne').mockResolvedValue(createUserDto as User);
  
//         await expect(userService.createUser(createUserDto)).rejects.toThrow('Email already exists');
//       });
//   })
// });
