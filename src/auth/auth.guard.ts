import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (!request.headers.authorization) throw new UnauthorizedException();

    const authHeaderType = request.headers.authorization.split(' ')[0];
    const authHeaderJwtToken = request.headers.authorization.split(' ')[1];

    if (authHeaderType !== 'Bearer' || !authHeaderJwtToken)
      throw new UnauthorizedException();

    await this.authService.checkTokenOnValidity(authHeaderJwtToken);

    return true;
  }
}
