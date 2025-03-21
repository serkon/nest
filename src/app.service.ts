import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World! Test01';
  }

  handleWebhook(payload: any) {
    if (payload.ref === 'refs/heads/master' || payload.ref === 'refs/heads/main') {
      console.log('GitHub push detected. Updating...');
      exec(
        'git pull origin "$(echo $payload.ref | sed \'s/refs\\/heads\\//\')" && npm install && pm2 restart dirdir-dev',
        (err, stdout, stderr) => {
          if (err) {
            console.error(`exec error: ${err}`);
            return;
          }
          console.log(`stdout: ${stdout}`);
          console.error(`stderr: ${stderr}`);
        },
      );
    } else {
      console.log('Ignoring push to non-master/main branch. 1');
    }
  }
}
