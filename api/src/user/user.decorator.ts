import {
  createParamDecorator,
  ExecutionContext,
  HttpStatus,
} from '@nestjs/common';
import { makeHttpException } from '../utils/http-response';

export const User_ = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (!request.user) {
      throw makeHttpException(HttpStatus.UNAUTHORIZED);
    }
    return request.user;
  },
);
