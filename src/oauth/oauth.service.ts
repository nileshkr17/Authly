import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';

@Injectable()
export class OauthService {
  constructor(
    private usersService: UsersService,
  ) {}

  async validateOAuthUser(
    email: string,
    provider: 'google' | 'github',
    providerId: string,
    firstName?: string,
    lastName?: string,
  ): Promise<User> {
    let user: User;

    if (provider === 'google') {
      user = await this.usersService.findByGoogleId(providerId);
    } else {
      user = await this.usersService.findByGithubId(providerId);
    }

    if (!user) {
      user = await this.usersService.findByEmail(email);
      if (user) {
        // Link OAuth account to existing user
        const updateData: Partial<User> = {};
        if (provider === 'google') {
          updateData.googleId = providerId;
        } else {
          updateData.githubId = providerId;
        }
        user = await this.usersService.update(user.id, updateData);
      } else {
        // Create new user
        const createData: any = {
          email,
          firstName,
          lastName,
          isEmailVerified: true,
        };
        if (provider === 'google') {
          createData.googleId = providerId;
        } else {
          createData.githubId = providerId;
        }
        user = await this.usersService.create(createData);
      }
    }

    return user;
  }
}
