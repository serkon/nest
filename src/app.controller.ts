import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { WebhookService } from './webhook/webhook.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  handleWebhookPost(@Body() payload: any) {
    this.appService.handleWebhook(payload);
    return 'OK';
  }
}
