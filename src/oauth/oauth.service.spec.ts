import { Test, TestingModule } from '@nestjs/testing';
import { OauthService } from './oauth.service';
import { UsersService } from '../users/users.service';
import { AuthService } from '../auth/auth.service';
import { User } from '../users/user.entity';

describe('OauthService', () => {
  let service: OauthService;

  const mockUser: User = {
    id: '1',
    email: 'test@example.com',
    password: null,
    firstName: 'John',
    lastName: 'Doe',
    isEmailVerified: true,
    googleId: 'google-id-123',
    githubId: null,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockUsersService = {
    findByEmail: jest.fn(),
    findByGoogleId: jest.fn(),
    findByGithubId: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };

  const mockAuthService = {
    generateTokens: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OauthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compile();

    service = module.get<OauthService>(OauthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateOAuthUser', () => {
    it('should return existing user with Google ID', async () => {
      mockUsersService.findByGoogleId.mockResolvedValue(mockUser);

      const result = await service.validateOAuthUser(
        'test@example.com',
        'google',
        'google-id-123',
        'John',
        'Doe',
      );

      expect(result).toEqual(mockUser);
      expect(mockUsersService.findByGoogleId).toHaveBeenCalledWith('google-id-123');
    });

    it('should create new user if not found', async () => {
      mockUsersService.findByGoogleId.mockResolvedValue(null);
      mockUsersService.findByEmail.mockResolvedValue(null);
      mockUsersService.create.mockResolvedValue(mockUser);

      const result = await service.validateOAuthUser(
        'newuser@example.com',
        'google',
        'google-id-456',
        'Jane',
        'Doe',
      );

      expect(result).toEqual(mockUser);
      expect(mockUsersService.create).toHaveBeenCalled();
    });
  });
});
