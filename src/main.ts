import {NestFactory, Reflector} from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import {ClassSerializerInterceptor, ValidationPipe} from "@nestjs/common";
import {ExcludeNullInterceptor} from "./utils/exclude-null.interceptor";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // Serialization: that uses class-transformer under the hood @UseInterceptors(ClassSerializerInterceptor)
  app.useGlobalInterceptors(new ClassSerializerInterceptor(
      app.get(Reflector))
  );

  // Custom interceptor to remove null value
  app.useGlobalInterceptors(new ExcludeNullInterceptor());

  app.use(cookieParser());

  await app.listen(3000);
}
bootstrap();
