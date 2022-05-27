import { Module } from '@nestjs/common';
import { SubscribersGrpcController } from './subscribers-grpc.controller';
import {join} from "path";
import {ConfigService} from "@nestjs/config";
import {ClientProxyFactory, Transport} from "@nestjs/microservices";

@Module({
  controllers: [SubscribersGrpcController],
  providers: [
    {
      provide: 'SUBSCRIBERS_PACKAGE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.GRPC,
          options: {
            package: 'subscribers',
            protoPath: join(process.cwd(), 'src/subscribers-grpc/proto/subscribers.proto'),
            url: configService.get('GRPC_CONNECTION_URL')
          },
        })
      },
      inject: [ConfigService],
    },
  ],
})
export class SubscribersGrpcModule {}
