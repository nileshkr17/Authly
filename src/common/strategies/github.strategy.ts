import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OauthService } from '../../oauth/oauth.service';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(
    private configService: ConfigService,
    private oauthService: OauthService,
  ) {
    super({
      clientID: configService.get<string>('GITHUB_CLIENT_ID'),
      clientSecret: configService.get<string>('GITHUB_CLIENT_SECRET'),
      callbackURL: configService.get<string>('GITHUB_CALLBACK_URL'),
      scope: ['user:email'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: any): Promise<any> {
    const { id, emails, displayName } = profile;
    const email = emails && emails[0] ? emails[0].value : null;

    if (!email) {
      return done(new Error('No email found in GitHub profile'), null);
    }

    const nameParts = displayName ? displayName.split(' ') : [];
    const user = await this.oauthService.validateOAuthUser(
      email,
      'github',
      id,
      nameParts[0],
      nameParts.slice(1).join(' '),
    );
    done(null, user);
  }
}
