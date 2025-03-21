import { Controller, Post, Body, Get } from '@nestjs/common';
import { WebhookService } from './webhook.service';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post()
  handleWebhookPost(@Body() payload: any) {
    this.webhookService.handleWebhook(payload);
    return 'OK';
  }

  @Get()
  handleWebhookGet() {
    return 'Webhook is listening for POST requests.';
  }
}
