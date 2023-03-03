import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AuthGuard } from './auth.guard';
import { PublicGuard } from './public.guard';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthGuard, PublicGuard],
  imports: [forwardRef(() => UsersModule), JwtModule, ConfigModule],
  exports: [AuthService, AuthGuard, PublicGuard],
})
export class AuthModule {}
