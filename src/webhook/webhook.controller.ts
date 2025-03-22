import { Body, Controller, Get, Post } from '@nestjs/common';
import { WebhookService } from './webhook.service';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post()
  handleWebhookPost(@Body() payload: GitHubPushWebhook) {
    this.webhookService.handleWebhook(payload);
    return 'OK';
  }

  @Get()
  handleWebhookGet() {
    return 'Webhook is listening for POST requests.';
  }
}
