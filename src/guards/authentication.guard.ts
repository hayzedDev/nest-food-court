import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  HttpException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { BadRequestException } from '@nestjs/common/exceptions';
import { User } from '../entities/user.entity';
import { InjectModel } from 'nestjs-objection/dist';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private configService: ConfigService,
    @InjectModel(User) private readonly UserModel: typeof User,
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
      // Note: If there is any error cause by jwtservice.verify, it would throw an error which would be caught by the catch block

      // check if user is found
      const user = await this.UserModel.query().findOne({
        id: decodedToken.id,
      });

      if (!user)
        new HttpException('Authentication Error: User not found!', 404);
      request.user = { id: user?.id, role: user?.role };
      return true;
    } catch (error: any) {
      console.log(error);

      if (error.name === 'JsonWebTokenError')
        throw new HttpException(
          'Authentication error! Please Login again',
          401,
        );
      if (error.name === 'TokenExpiredError')
        throw new HttpException(
          'Authentication expired! Please Login again',
          401,
        );
      throw new HttpException(error.message, error.status || 500);
    }
  }
}
