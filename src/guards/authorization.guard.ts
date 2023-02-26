import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

import { Reflector } from '@nestjs/core';
import { BadRequestException } from '@nestjs/common/exceptions';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // check if it is a public handler/endpoint
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    );

    if (isPublic) return true;

    const roles = this.reflector.get<string>('roles', context.getHandler());
    console.log(roles);
    console.log('now in authguard');
    if (!roles) {
      return true;
    }
    const role = request.role;
    // const role = request.user?.role;
    console.log(request.user);
    console.log(request.role);

    if (role !== roles)
      throw new HttpException(
        'Authorization Error: You cannot use this service',
        403,
      );

    return true;
  }
}
