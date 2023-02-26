import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { BadRequestException } from '@nestjs/common/exceptions';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private configService: ConfigService,
  ) {}

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

      if (!authHeader)
        throw new UnauthorizedException(
          'Authentication is required to make this request',
        );

      const token = authHeader.split(' ')[1];
      const decodedToken = await this.jwtService.verify(token, {
        secret: this.configService.get('JWT_ACCESS_TOKEN'),
      });

      if (!decodedToken)
        throw new UnauthorizedException(
          'Authentication expired! Please Login again',
        );

      request.profileId = decodedToken.profileId;

      return true;
    } catch (error) {
      throw new BadRequestException('Bad request error');
    }
  }
}
