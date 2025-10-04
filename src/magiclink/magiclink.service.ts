import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { UsersService } from '../users/users.service';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class MagiclinkService {
  private transporter: nodemailer.Transporter;

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('SMTP_HOST'),
      port: this.configService.get<number>('SMTP_PORT'),
      secure: this.configService.get<boolean>('SMTP_SECURE') || false,
      auth: {
        user: this.configService.get<string>('SMTP_USER'),
        pass: this.configService.get<string>('SMTP_PASSWORD'),
      },
    });
  }

  async sendMagicLink(email: string): Promise<{ message: string }> {
    let user = await this.usersService.findByEmail(email);

    if (!user) {
      // Create user if doesn't exist
      user = await this.usersService.create({
        email,
        isEmailVerified: false,
      });
    }

    const token = this.jwtService.sign(
      { email: user.email, sub: user.id },
      {
        secret: this.configService.get<string>('MAGIC_LINK_SECRET'),
        expiresIn: this.configService.get<string>('MAGIC_LINK_EXPIRATION'),
      },
    );

    const magicLink = `${this.configService.get<string>('FRONTEND_URL') || 'http://localhost:3000'}/api/magiclink/verify?token=${token}`;

    try {
      await this.transporter.sendMail({
        from: this.configService.get<string>('SMTP_FROM'),
        to: email,
        subject: 'Your Magic Link for Authly',
        html: `
          <h1>Login to Authly</h1>
          <p>Click the link below to login:</p>
          <a href="${magicLink}">Login</a>
          <p>This link will expire in ${this.configService.get<string>('MAGIC_LINK_EXPIRATION')}.</p>
          <p>If you didn't request this link, please ignore this email.</p>
        `,
      });

      return { message: 'Magic link sent to your email' };
    } catch (error) {
      console.error('Error sending email:', error);
      // For development, return the token
      if (this.configService.get<string>('NODE_ENV') === 'development') {
        return { message: `Development mode: ${magicLink}` };
      }
      throw new Error('Failed to send magic link');
    }
  }

  async verifyMagicLink(token: string) {
    try {
      const payload = this.jwtService.verify(token, {
        secret: this.configService.get<string>('MAGIC_LINK_SECRET'),
      });

      const user = await this.usersService.findOne(payload.sub);
      if (!user) {
        throw new UnauthorizedException('Invalid token');
      }

      // Update user to mark email as verified
      if (!user.isEmailVerified) {
        await this.usersService.update(user.id, { isEmailVerified: true });
      }

      // Generate auth tokens
      return this.authService.issueTokens(user);
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired magic link');
    }
  }
}
