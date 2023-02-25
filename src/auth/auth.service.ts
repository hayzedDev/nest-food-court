import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-objection/dist';
import { User } from '../entities/user.entity';
import { UserSignUpDTO } from './dto/user-signup.dto';
import { LoginDTO } from './dto/login.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JWTHelpersService } from './jwthelpers.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private readonly UserModel: typeof User,
    private readonly jWTHelpersService: JWTHelpersService,
  ) {}
  async signup(user: UserSignUpDTO) {
    // try {
    /**Check if user exists */
    const userExists = await this.UserModel.query().findOne({
      email: user.email,
    });

    if (userExists)
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: 'User already exists',
        },
        HttpStatus.CONFLICT,
      );

    /**hash password */
    const hashedPassword = await this.jWTHelpersService.hashPassword(
      user.password,
    );
    /**create user */
    const newlyCreatedUser = await this.UserModel.query().insert({
      ...user,
      password: hashedPassword,
    });
    console.log(newlyCreatedUser);

    const { name, email, username } = user;
    /**create a jwt token and send it back  */
    const token = await this.jWTHelpersService.signToken({
      id: newlyCreatedUser.id.toString(),
    });

    return { token, id: newlyCreatedUser.id, name, email, username };
    // } catch (error) {
    //   console.log(error);
    //   throw new HttpException('General server Error', 500);
    // }
  }

  async loginUser(userInfo: LoginDTO) {
    /**check if user exist with the email provided */
    const { email: emailInUserInfo, password } = userInfo;

    const userExists = await this.UserModel.query().findOne({
      email: emailInUserInfo,
    });

    if (!userExists) throw new HttpException('Invalid login credentials', 401);
    /**check if password is correct for the user */
    const hash = await this.jWTHelpersService.hashPassword(
      userInfo.password,
      userExists.password.split(':')[1],
    );

    if (hash !== userExists.password)
      throw new HttpException('Invalid login credentials', 401);
    /**create a new token ans send it back */
    const token = await this.jWTHelpersService.signToken({
      id: userExists.id.toString(),
    });
    const { id, name, email, username } = userExists;
    /**return token and some user details */
    return { token, id, name, email, username };
  }
}
