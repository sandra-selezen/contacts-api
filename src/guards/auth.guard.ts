import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const { authorization } = req.headers;
    if (!authorization) {
      throw new UnauthorizedException('Authorization header missing');
    }
    const [bearer, token] = authorization.split(' ');

    if (bearer !== 'Bearer' && !token) {
      throw new UnauthorizedException();
    }
    try {
      const user = this.jwtService.verify(token);
      req.user = user;
      return true;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
