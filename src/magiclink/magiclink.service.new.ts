import { 
  Injectable, 
  UnauthorizedException, 
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import * as nodemailer from 'nodemailer';
import * as crypto from 'crypto';
import { UsersService } from '../users/users.service';
import { AuthService } from '../auth/auth.service';
import { MagicLinkToken } from './entities/magic-link-token.entity';

@Injectable()
export class MagiclinkService {
  private transporter: nodemailer.Transporter;

  constructor(
    @InjectRepository(MagicLinkToken)
    private magicLinkTokenRepository: Repository<MagicLinkToken>,
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

  async sendMagicLink(
    email: string,
    ipAddress: string,
    userAgent: string,
  ): Promise<{ message: string; devToken?: string }> {
    // Rate limiting check - prevent spam
    const oneMinuteAgo = new Date(Date.now() - 60000);
    const recentTokens = await this.magicLinkTokenRepository
      .createQueryBuilder('token')
      .innerJoin('token.user', 'user')
      .where('user.email = :email', { email })
      .andWhere('token.createdAt > :oneMinuteAgo', { oneMinuteAgo })
      .getCount();

    if (recentTokens >= 3) {
      throw new BadRequestException('Too many magic link requests. Please try again later.');
    }

    let user = await this.usersService.findByEmail(email);

    if (!user) {
      // Create user if doesn't exist
      user = await this.usersService.create({
        email,
        isEmailVerified: false,
      });
    }

    // Generate a more secure token
    const tokenId = crypto.randomUUID();
    const jwtPayload = {
      sub: user.id,
      email: user.email,
      tokenId,
      type: 'magic_link',
      iat: Math.floor(Date.now() / 1000),
    };

    const token = this.jwtService.sign(jwtPayload, {
      secret: this.configService.get<string>('MAGIC_LINK_SECRET'),
      expiresIn: this.configService.get<string>('MAGIC_LINK_EXPIRATION'),
    });

    // Calculate expiration time
    const expirationTime = this.configService.get<string>('MAGIC_LINK_EXPIRATION');
    const expiresAt = new Date();
    
    // Parse expiration time (e.g., "15m" -> 15 minutes)
    const timeMatch = expirationTime.match(/^(\d+)([smhd])$/);
    if (timeMatch) {
      const value = parseInt(timeMatch[1]);
      const unit = timeMatch[2];
      
      switch (unit) {
        case 's':
          expiresAt.setSeconds(expiresAt.getSeconds() + value);
          break;
        case 'm':
          expiresAt.setMinutes(expiresAt.getMinutes() + value);
          break;
        case 'h':
          expiresAt.setHours(expiresAt.getHours() + value);
          break;
        case 'd':
          expiresAt.setDate(expiresAt.getDate() + value);
          break;
      }
    }

    // Store token in database
    const magicLinkToken = this.magicLinkTokenRepository.create({
      token: tokenId,
      userId: user.id,
      expiresAt,
      ipAddress,
      userAgent,
    });

    await this.magicLinkTokenRepository.save(magicLinkToken);

    const frontendUrl = this.configService.get<string>('FRONTEND_URL') || 'http://localhost:3001';
    const magicLink = `${frontendUrl}/magic-link?token=${token}`;

    try {
      await this.transporter.sendMail({
        from: this.configService.get<string>('SMTP_FROM'),
        to: email,
        subject: 'Your Magic Link for Authly',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #333;">Welcome to Authly</h1>
            <p>Click the button below to securely login to your account:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${magicLink}" 
                 style="background-color: #007bff; color: white; padding: 12px 24px; 
                        text-decoration: none; border-radius: 6px; display: inline-block;">
                Login to Authly
              </a>
            </div>
            <p style="color: #666; font-size: 14px;">
              This link will expire in ${expirationTime} and can only be used once.
            </p>
            <p style="color: #666; font-size: 14px;">
              If you didn't request this link, please ignore this email.
            </p>
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
            <p style="color: #999; font-size: 12px;">
              Request from IP: ${ipAddress}<br>
              Time: ${new Date().toISOString()}
            </p>
          </div>
        `,
      });

      return { message: 'Magic link sent to your email successfully' };
    } catch (error) {
      console.error('Error sending email:', error);
      
      // Clean up the token if email failed
      await this.magicLinkTokenRepository.delete(magicLinkToken.id);
      
      // For development, return the token
      if (this.configService.get<string>('NODE_ENV') === 'development') {
        return { 
          message: 'Development mode: Email service not configured',
          devToken: token,
        };
      }
      
      throw new InternalServerErrorException('Failed to send magic link. Please try again.');
    }
  }

  async verifyMagicLink(
    token: string,
    ipAddress: string,
    userAgent: string,
  ) {
    try {
      // Verify JWT token
      const payload = this.jwtService.verify(token, {
        secret: this.configService.get<string>('MAGIC_LINK_SECRET'),
      });

      // Check if token type is correct
      if (payload.type !== 'magic_link') {
        throw new UnauthorizedException('Invalid token type');
      }

      // Find the token in database
      const magicLinkToken = await this.magicLinkTokenRepository.findOne({
        where: {
          token: payload.tokenId,
          userId: payload.sub,
        },
        relations: ['user'],
      });

      if (!magicLinkToken) {
        throw new UnauthorizedException('Token not found');
      }

      // Check if token is already used
      if (magicLinkToken.isUsed) {
        throw new UnauthorizedException('Magic link has already been used');
      }

      // Check if token is expired
      if (new Date() > magicLinkToken.expiresAt) {
        throw new UnauthorizedException('Magic link has expired');
      }

      // Mark token as used
      magicLinkToken.isUsed = true;
      magicLinkToken.usedAt = new Date();
      await this.magicLinkTokenRepository.save(magicLinkToken);

      const user = magicLinkToken.user;
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      // Update user to mark email as verified
      if (!user.isEmailVerified) {
        await this.usersService.update(user.id, { isEmailVerified: true });
        user.isEmailVerified = true;
      }

      // Generate auth tokens
      const authTokens = await this.authService.generateTokens(user);

      // Clean up old expired tokens for this user
      await this.cleanupExpiredTokens(user.id);

      return {
        message: 'Login successful',
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          isEmailVerified: user.isEmailVerified,
        },
        ...authTokens,
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      
      console.error('Magic link verification error:', error);
      throw new UnauthorizedException('Invalid or expired magic link');
    }
  }

  private async cleanupExpiredTokens(userId: string): Promise<void> {
    try {
      await this.magicLinkTokenRepository.delete({
        userId,
        expiresAt: LessThan(new Date()),
      });
    } catch (error) {
      console.error('Error cleaning up expired tokens:', error);
    }
  }

  // Method to get magic link statistics (useful for admin)
  async getMagicLinkStats(userId: string): Promise<{
    totalSent: number;
    totalUsed: number;
    lastUsed?: Date;
  }> {
    const totalSent = await this.magicLinkTokenRepository.count({
      where: { userId },
    });

    const totalUsed = await this.magicLinkTokenRepository.count({
      where: { userId, isUsed: true },
    });

    const lastUsedToken = await this.magicLinkTokenRepository.findOne({
      where: { userId, isUsed: true },
      order: { usedAt: 'DESC' },
    });

    return {
      totalSent,
      totalUsed,
      lastUsed: lastUsedToken?.usedAt,
    };
  }
}
