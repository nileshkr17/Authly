import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { OauthModule } from './oauth/oauth.module';
import { MagiclinkModule } from './magiclink/magiclink.module';
import { User } from './users/user.entity';
import { MagicLinkToken } from './magiclink/entities/magic-link-token.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const dbType = configService.get('DB_TYPE') || 'postgres';
        
        if (dbType === 'sqlite') {
          return {
            type: 'sqlite',
            database: configService.get('DB_DATABASE') || 'authly_dev.db',
            entities: [User, MagicLinkToken],
            synchronize: configService.get('NODE_ENV') !== 'production',
            logging: configService.get('NODE_ENV') === 'development',
          };
        }
        
        // PostgreSQL configuration for production
        return {
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: parseInt(configService.get('DB_PORT'), 10),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          entities: [User, MagicLinkToken],
          synchronize: configService.get('NODE_ENV') !== 'production',
          logging: configService.get('NODE_ENV') === 'development',
        };
      },
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    OauthModule,
    MagiclinkModule,
  ],
})
export class AppModule {}
