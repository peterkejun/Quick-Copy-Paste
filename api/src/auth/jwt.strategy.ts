import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpStatus, Injectable } from '@nestjs/common';
import { getJwtSecret } from './auth.secret';
import { makeHttpException } from 'src/utils/http-response';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: getJwtSecret(),
    });
  }

  async validate(payload: any): Promise<User> {
    const uid = payload.uid as number;
    if (uid === undefined || uid === null) {
      throw makeHttpException(HttpStatus.UNAUTHORIZED);
    }
    const user = await this.userService.assertUserExists(uid);
    return user;
  }
}
