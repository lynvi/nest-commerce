import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import cookie, { FastifyCookieOptions } from '@fastify/cookie';
import { IConfig } from './config/config.interface';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  const configService = app.get<ConfigService>(ConfigService);

  app.register(cookie, {
    secret: configService.get<IConfig['cookies']>('cookies').secret, // for cookies signature
    parseOptions: {}, // options for parsing cookies
  } as FastifyCookieOptions);

  app.enableCors({
    origin: '*', // TODO :: Change this in production
  });

  const PORT = process.env.PORT || 4000;
  await app.listen(PORT, '0.0.0.0');

  Logger.log(`🚀 Application is running on http://localhost:${PORT}`);
  Logger.log(`🚀 Application is running on http://localhost:${PORT}/graphiql`);
}
bootstrap();
