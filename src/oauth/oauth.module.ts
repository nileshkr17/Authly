import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { OauthService } from './oauth.service';
import { OauthController } from './oauth.controller';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { GoogleStrategy } from '../common/strategies/google.strategy';
import { GithubStrategy } from '../common/strategies/github.strategy';

@Module({
  imports: [PassportModule, UsersModule, AuthModule],
  providers: [OauthService, GoogleStrategy, GithubStrategy],
  controllers: [OauthController],
})
export class OauthModule {}
