import { Controller, Get } from '@nestjs/common';
import { AppService } from '../app.service';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
