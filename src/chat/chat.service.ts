import {Injectable} from '@nestjs/common';
import {AuthenticationService} from "../authentication/authentication.service";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Socket} from 'socket.io';
import {parse} from 'cookie';
import Message from "./entities/message.entity";
import User from "../users/entities/user.entity";
import {WsException} from "@nestjs/websockets";

@Injectable()
export class ChatService {
    constructor(
        private readonly authenticationService: AuthenticationService,
        @InjectRepository(Message)
        private messagesRepository: Repository<Message>,
    ) {
    }

    async saveMessage(content: string, author: User) {
        const newMessage = await this.messagesRepository.create({
            content,
            author
        });
        await this.messagesRepository.save(newMessage);
        return newMessage;
    }

    async getAllMessages() {
        return this.messagesRepository.find({
            relations: ['author']
        });
    }

    async getUserFromSocket(socket: Socket) {
        const cookie = socket.handshake.headers.cookie;
        console.log(cookie);
        const {Authentication: authenticationToken} = parse(cookie);
        const user = await this.authenticationService.getUserFromAuthenticationToken(authenticationToken);
        if (!user) {
            throw new WsException('Invalid credentials.');
        }
        return user;
    }
}
