import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { MagiclinkService } from './magiclink.service';
import { UsersService } from '../users/users.service';
import { AuthService } from '../auth/auth.service';
import { User } from '../users/user.entity';

// Mock nodemailer before importing it
jest.mock('nodemailer', () => ({
  createTransport: jest.fn().mockReturnValue({
    sendMail: jest.fn().mockResolvedValue({ messageId: 'test-message-id' }),
  }),
}));

describe('MagiclinkService', () => {
  let service: MagiclinkService;

  const mockUser: User = {
    id: '1',
    email: 'test@example.com',
    password: null,
    firstName: 'John',
    lastName: 'Doe',
    isEmailVerified: false,
    googleId: null,
    githubId: null,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockUsersService = {
    findByEmail: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };

  const mockAuthService = {
    generateTokens: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn().mockReturnValue('mock-token'),
    verify: jest.fn().mockReturnValue({ sub: '1', email: 'test@example.com' }),
  };

  const mockConfigService = {
    get: jest.fn((key: string) => {
      const config = {
        MAGIC_LINK_SECRET: 'test-magic-secret',
        MAGIC_LINK_EXPIRATION: '15m',
        SMTP_HOST: 'smtp.test.com',
        SMTP_PORT: 587,
        SMTP_SECURE: false,
        SMTP_USER: 'test@test.com',
        SMTP_PASSWORD: 'password',
        SMTP_FROM: 'noreply@test.com',
        FRONTEND_URL: 'http://localhost:3000',
        NODE_ENV: 'development',
      };
      return config[key];
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MagiclinkService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: JwtService, useValue: mockJwtService },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    service = module.get<MagiclinkService>(MagiclinkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sendMagicLink', () => {
    it('should send magic link to existing user', async () => {
      mockUsersService.findByEmail.mockResolvedValue(mockUser);

      const result = await service.sendMagicLink('test@example.com');

      expect(result).toHaveProperty('message');
      expect(mockJwtService.sign).toHaveBeenCalled();
    });

    it('should create user and send magic link if user does not exist', async () => {
      mockUsersService.findByEmail.mockResolvedValue(null);
      mockUsersService.create.mockResolvedValue(mockUser);

      const result = await service.sendMagicLink('newuser@example.com');

      expect(result).toHaveProperty('message');
      expect(mockUsersService.create).toHaveBeenCalled();
    });
  });

  describe('verifyMagicLink', () => {
    it('should verify magic link and return tokens', async () => {
      mockUsersService.findOne.mockResolvedValue(mockUser);
      mockAuthService.generateTokens = jest.fn().mockReturnValue({
        access_token: 'token',
        refresh_token: 'refresh',
        user: mockUser,
      });

      const result = await service.verifyMagicLink('valid-token');

      expect(result).toHaveProperty('access_token');
      expect(mockJwtService.verify).toHaveBeenCalled();
    });
  });
});
