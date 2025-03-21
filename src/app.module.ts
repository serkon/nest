import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebhookService } from './webhook/webhook.service';
import { WebhookController } from './webhook/webhook.controller';

@Module({
  imports: [],
  controllers: [AppController, WebhookController],
  providers: [AppService, WebhookService],
})
export class AppModule {}
