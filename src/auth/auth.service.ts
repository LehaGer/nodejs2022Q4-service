import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RefreshTokenDto } from './dto/refreshToken.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly _userService: UsersService,
    private readonly _jwtService: JwtService,
    private readonly _configService: ConfigService,
  ) {}

  async signup(signupUserDto: CreateUserDto) {
    return this._userService.create(signupUserDto);
  }

  async findUser(findUserDto: CreateUserDto) {
    const allUsers = await this._userService.findAll();
    const allUsersValidated = await Promise.all(
      allUsers.map(async (user) => {
        const isPasswordValid = await bcrypt.compare(
          findUserDto.password,
          user.password,
        );
        const isLoginValid = user.login === findUserDto.login;
        return {
          user,
          isPasswordValid,
          isLoginValid,
        };
      }),
    );
    const user = allUsersValidated.find(
      ({ isPasswordValid, isLoginValid }) => isLoginValid && isPasswordValid,
    )?.user;

    return user ?? null;
  }

  async login(loginUserDto: CreateUserDto) {
    const user = await this.validateUser(loginUserDto);
    const payload = {
      userId: user.id,
      login: user.login,
    };
    const tokens = {
      access_token: this._jwtService.sign(payload, {
        secret: this._configService.get('JWT_SECRET_KEY'),
        expiresIn: this._configService.get('TOKEN_EXPIRE_TIME'),
      }),
      refresh_token: this._jwtService.sign(payload, {
        secret: this._configService.get('JWT_SECRET_REFRESH_KEY'),
        expiresIn: this._configService.get('TOKEN_REFRESH_EXPIRE_TIME'),
      }),
    };
    await this._userService.updateRefreshToken(user.id, tokens.refresh_token);
    return tokens;
  }

  async validateUser(validateUserDto: CreateUserDto): Promise<any> {
    const user = await this.findUser(validateUserDto);
    if (!user) throw new ForbiddenException();
    const { password, ...result } = user;
    return result;
  }

  async refresh(refreshTokenDto: RefreshTokenDto) {
    let userTokenPayload;
    try {
      userTokenPayload = this._jwtService.verify(refreshTokenDto.refreshToken, {
        secret: this._configService.get('JWT_SECRET_REFRESH_KEY'),
      });
    } catch (e) {
      throw new ForbiddenException();
    }

    userTokenPayload = {
      userId: userTokenPayload.userId,
      login: userTokenPayload.login,
    };

    const user = await this._userService.findOne(userTokenPayload.userId);

    if (
      !user.refreshToken ||
      user.refreshToken !== refreshTokenDto.refreshToken
    )
      throw new ForbiddenException();

    const tokens = {
      access_token: this._jwtService.sign(userTokenPayload, {
        secret: this._configService.get('JWT_SECRET_KEY'),
        expiresIn: this._configService.get('TOKEN_EXPIRE_TIME'),
      }),
      refresh_token: this._jwtService.sign(userTokenPayload, {
        secret: this._configService.get('JWT_SECRET_REFRESH_KEY'),
        expiresIn: this._configService.get('TOKEN_REFRESH_EXPIRE_TIME'),
      }),
    };

    await this._userService.updateRefreshToken(user.id, tokens.refresh_token);

    return tokens;
  }

  async checkTokenOnValidity(token: string) {
    try {
      this._jwtService.verify(token, {
        secret: this._configService.get('JWT_SECRET_REFRESH_KEY'),
      });
    } catch (e) {
      throw new ForbiddenException();
    }
  }
}
