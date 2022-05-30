import {Global, Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {RedisPubSub} from "graphql-redis-subscriptions";

export const PUB_SUB = 'PUB_SUB';

@Global()
@Module({
    imports: [ConfigModule],
    providers: [
        {
            provide: PUB_SUB,
            useFactory: (configService: ConfigService) => new RedisPubSub({
                connection: {
                    host: configService.get('REDIS_HOST'),
                    port: configService.get('REDIS_PORT'),
                    username: configService.get('REDIS_USERNAME'),
                    password: configService.get('REDIS_PASSWORD'),
                }
            }),
            inject: [ConfigService]
        }
    ],
    exports: [PUB_SUB],
})
export class PubSubModule {
}
