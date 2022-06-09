import {NestFactory, Reflector} from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import {ClassSerializerInterceptor, ValidationPipe} from "@nestjs/common";
import {ExcludeNullInterceptor} from "./utils/interceptors/exclude-null.interceptor";
import { config } from 'aws-sdk';
import {ConfigService} from "@nestjs/config";
import rawBodyMiddleware from './utils/middlewares/raw-body.middleware';
import getLogLevels from "./utils/get-log-levels";
import CustomLogger from "./logger/custom-logger";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    //logger: getLogLevels(process.env.NODE_ENV === 'production'),
    bufferLogs: true,
  });
  app.useLogger(app.get(CustomLogger));
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

  const swaggerConfig = new DocumentBuilder()
      .setTitle('API with NestJS')
      .setDescription('API developed throughout the API with NestJS course')
      .setVersion('1.0')
      .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  const port = configService.get('PORT') ?? 3000;

  await app.listen(port);
}
bootstrap();
