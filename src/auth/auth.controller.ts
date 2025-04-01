import { Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Public } from './jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Get('login')
  getLogin() {
    return 'Auth Login is listening for POST requests.';
  }

  @Public() // Login endpoint'i public olmalı
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Request() req: PassportRequest) {
    // return await new Promise((resolve) => resolve({ user: req.user }));

    return this.authService.jwt(req.user);
  }

  @HttpCode(HttpStatus.OK)
  // @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req: PassportRequest) {
    console.log('req', req.user);

    return req.user;
  }
}
