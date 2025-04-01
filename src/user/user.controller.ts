import { Controller, Get, HttpCode, HttpStatus, Request } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @Get('profile')
  getProfile(@Request() req: PassportRequest) {
    return this.userService.findOne(req.user.username);
  }
}
