import { Controller, Post, Body } from '@nestjs/common';
import { WebhookService } from './webhook.service';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  // test
  @Post()
  handleWebhook(@Body() payload: any) {
    this.webhookService.handleWebhook(payload);
    return 'OK';
  }
}
