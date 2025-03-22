import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { WebhookController } from './webhook.controller';
import { GithubWebhookMiddleware } from './webhook.middleware';
import { WebhookService } from './webhook.service';

@Module({
  imports: [],
  controllers: [WebhookController],
  providers: [WebhookService],
})
export class WebhookModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(GithubWebhookMiddleware).forRoutes({ path: 'webhook', method: RequestMethod.POST });
  }
}
