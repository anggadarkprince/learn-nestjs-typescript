import {NestFactory, Reflector} from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import {ClassSerializerInterceptor, ValidationPipe} from "@nestjs/common";
import {ExcludeNullInterceptor} from "./utils/exclude-null.interceptor";
import { config } from 'aws-sdk';
import {ConfigService} from "@nestjs/config";
import rawBodyMiddleware from './utils/raw-body.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }));

  // Serialization: that uses class-transformer under the hood @UseInterceptors(ClassSerializerInterceptor)
  //app.useGlobalInterceptors(new ClassSerializerInterceptor(
  //    app.get(Reflector))
  //);

  // Custom interceptor to remove null value
  //app.useGlobalInterceptors(new ExcludeNullInterceptor());

  app.use(cookieParser());

  const configService = app.get(ConfigService);
  app.enableCors({
    origin: configService.get('FRONTEND_URL'),
    credentials: true
  });

  app.use(rawBodyMiddleware());

  await app.listen(3000);
}
bootstrap();
