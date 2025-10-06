import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MagiclinkService } from './magiclink.service';
import { MagiclinkController } from './magiclink.controller';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { MagicLinkToken } from './entities/magic-link-token.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MagicLinkToken]),
    UsersModule,
    AuthModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('MAGIC_LINK_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('MAGIC_LINK_EXPIRATION'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [MagiclinkService],
  controllers: [MagiclinkController],
})
export class MagiclinkModule {}
