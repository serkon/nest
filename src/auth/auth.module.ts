import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'local' }),
    // JwtModule.register({
    //   global: true,
    //   secret: 'ddd',
    //   signOptions: { expiresIn: '60s' },
    // }),
    JwtModule.registerAsync({
      // imports: [ConfigModule], // Eğer ConfigModule global değilse bu satır gerekli
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const secret = configService.get<string>('JWT_SECRET');

        if (!secret) {
          throw new Error('JWT_SECRET environment variable is not defined');
        }

        return {
          global: true,
          secret: secret,
          signOptions: { expiresIn: '60m' },
        };
      },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
