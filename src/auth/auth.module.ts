import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AuthGuard } from './auth.guard';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  imports: [forwardRef(() => UsersModule), JwtModule, ConfigModule],
  exports: [AuthService, AuthGuard],
})
export class AuthModule {}
