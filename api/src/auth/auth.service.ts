import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.entity';
import { compare as bcryptCompare } from 'bcrypt';
import { getJwtSecret } from './auth.secret';
import { ValidatedUserId } from './auth.types';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<ValidatedUserId> {
    const user = await this.userService.findOneByEmail(email);
    if (user && (await bcryptCompare(pass, user.password))) {
      return {
        uid: user.id,
      };
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: getJwtSecret(),
      }),
    };
  }

  async signup(
    email: string,
    rawPassword: string,
    firstName: string,
    lastName: string,
  ): Promise<User> {
    const user = await this.userService.create(
      email,
      rawPassword,
      firstName,
      lastName,
    );
    delete user.password;
    return user;
  }
}
