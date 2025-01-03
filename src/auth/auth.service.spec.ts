import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: { createUser: jest.fn() } },
        { provide: JwtService, useValue: { sign: jest.fn() } },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should register a new user', async () => {
    const createUserDto = { username: 'john', password: 'password' };
    const user = { _id: '1', ...createUserDto };

    jest.spyOn(usersService, 'createUser').mockResolvedValue(user);
    jest.spyOn(jwtService, 'sign').mockReturnValue('token');

    const result = await service.register(createUserDto);
    expect(result).toEqual({ user, token: 'token' });
  });

  it('should throw error if user already exists', async () => {
    const createUserDto = { username: 'john', password: 'password' };

    jest.spyOn(usersService, 'createUser').mockRejectedValue(new BadRequestException('User already exists'));

    await expect(service.register(createUserDto)).rejects.toThrow(BadRequestException);
  });
});
