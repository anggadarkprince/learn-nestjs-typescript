import {Module} from '@nestjs/common';
import {SubscribersController} from './subscribers.controller';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {Transport, ClientProxyFactory} from '@nestjs/microservices';

@Module({
    imports: [ConfigModule],
    controllers: [SubscribersController],
    providers: [
        {
            provide: 'SUBSCRIBERS_SERVICE',
            useFactory: (configService: ConfigService) => {
                const user = configService.get('RABBITMQ_USER');
                const password = configService.get('RABBITMQ_PASSWORD');
                const host = configService.get('RABBITMQ_HOST');
                const queueName = configService.get('RABBITMQ_QUEUE_NAME');

                return ClientProxyFactory.create({
                    transport: Transport.RMQ,
                    options: {
                        urls: [`amqps://${user}:${password}@${host}`],
                        queue: queueName,
                        queueOptions: {
                            durable: true,
                        },
                    },
                })

                /* TCP transport
                return ClientProxyFactory.create({
                    transport: Transport.TCP,
                    options: {
                        host: configService.get('SUBSCRIBERS_SERVICE_HOST'),
                        port: configService.get('SUBSCRIBERS_SERVICE_PORT'),
                    },
                })
                */
            },
            inject: [ConfigService],
        }
    ]
})
export class SubscribersModule {
}
