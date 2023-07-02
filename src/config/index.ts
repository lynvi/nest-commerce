import { randomUUID } from 'crypto';
import { IConfig } from './config.interface';

export function config(): IConfig {
  //   const publicKey = readFileSync(
  //     join(__dirname, '..', '..', 'keys/public.key'),
  //     'utf-8',
  //   );
  //   const privateKey = readFileSync(
  //     join(__dirname, '..', '..', 'keys/private.key'),
  //     'utf-8',
  //   );

  return {
    port: parseInt(process.env.PORT, 10),

    cookies: {
      secret: process.env.COOKIES_SECRET,
    },
  };
}
