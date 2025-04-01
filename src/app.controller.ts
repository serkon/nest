import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(AuthGuard('local'))
  @Get('auth/login')
  async getLogin(@Request() req: HttpRequest<User>) {
    console.log(await new Promise((resolve) => resolve(req.body)));
    return 'Auth Login is listening for GET requests.';
  }

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req: HttpRequest<User>) {
    return await new Promise((resolve) => resolve(req.body));
  }
}
