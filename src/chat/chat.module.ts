import {Module} from '@nestjs/common';
import {ChatService} from './chat.service';
import {AuthenticationModule} from "../authentication/authentication.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import Message from "./entities/message.entity";
import {ChatGateway} from "./chat.gateway";

@Module({
    imports: [
        AuthenticationModule,
        TypeOrmModule.forFeature([Message]),
    ],
    providers: [ChatGateway, ChatService],
})
export class ChatModule {
}
