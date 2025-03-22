import { BadRequestException, Injectable, NestMiddleware } from '@nestjs/common';
import * as crypto from 'crypto';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class GithubWebhookMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const secret = process.env.WEBHOOK_SECRET ?? '';
    const signature = req.headers['x-hub-signature-256'] as string;
    const body = JSON.stringify(req.body);

    if (!signature) {
      throw new BadRequestException('No X-Hub-Signature-256 found on request');
    }

    const hmac = crypto.createHmac('sha256', secret);
    const digest = 'sha256=' + hmac.update(body).digest('hex');

    if (signature !== digest) {
      throw new BadRequestException('Invalid signature');
    }

    next();
  }
}
