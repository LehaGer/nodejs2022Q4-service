import {
  Body,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RefreshTokenDto } from './dto/refreshToken.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly _authService: AuthService,
    private readonly _userService: UsersService,
    private readonly _jwtService: JwtService,
    private readonly _configService: ConfigService,
  ) {}

  @Post('signup')
  @HttpCode(201)
  async signup(@Body() signupUserDto: CreateUserDto) {
    const { password, ...user } = await this._authService.signup(signupUserDto);
    return user;
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginUserDto: CreateUserDto) {
    return this._authService.login(loginUserDto);
  }

  @Post('refresh')
  @HttpCode(200)
  refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    if (!refreshTokenDto.refreshToken) throw new UnauthorizedException();
    return this._authService.refresh(refreshTokenDto);
  }
}
