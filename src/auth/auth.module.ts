import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';

import { AuthService } from './services/auth.service';

import { UsersModule } from '../users/users.module';

import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './controllers/auth.controller';
import config from '../config';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigType<typeof config>) => ({
        secret: configService.jwt.secret,
        signOptions: { expiresIn: configService.jwt.expiresIn as any },
      }),
      inject: [config.KEY],
    }),
  ],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController]
})
export class AuthModule {}