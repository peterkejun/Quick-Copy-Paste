import { Controller, Get } from '@nestjs/common';
import { Public } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  @Public()
  @Get('health')
  getHealth() {
    return null;
  }
}
