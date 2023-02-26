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
    try {
      const request = context.switchToHttp().getRequest();
      const authHeader = request.headers['x-food-court-token'];

      // check if it is a public handler/endpoint
      const isPublic = this.reflector.get<boolean>(
        'isPublic',
        context.getHandler(),
      );

      if (isPublic) return true;

      const roles = this.reflector.get<string[]>('roles', context.getHandler());
      if (!roles) {
        return true;
      }
      const user = request.user.role;
      if (user.roles !== roles)
        throw new HttpException(
          'Authorization Error: You are not Authorized to use this service',
          403,
        );

      return true;
    } catch (error) {
      throw new BadRequestException('Bad request error');
    }
  }
}
