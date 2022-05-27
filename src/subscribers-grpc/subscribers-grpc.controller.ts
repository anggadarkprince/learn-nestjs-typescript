import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    Inject,
    OnModuleInit,
    Post,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import SubscribersGrpcService from "./interfaces/subscribers-grpc.service.interface";
import {ClientGrpc} from "@nestjs/microservices";
import JwtAuthenticationGuard from "../authentication/guards/jwt-authentication.guard";
import CreateSubscriberDto from "../subscribers/dto/create-subscriber.dto";

@Controller('subscribers-grpc')
@UseInterceptors(ClassSerializerInterceptor)
export class SubscribersGrpcController implements OnModuleInit {
    private subscribersService: SubscribersGrpcService;

    constructor(@Inject('SUBSCRIBERS_PACKAGE') private client: ClientGrpc) {}

    onModuleInit() {
        // get service name in microservice
        this.subscribersService = this.client.getService<SubscribersGrpcService>('SubscribersService');
    }

    @Get()
    async getSubscribers() {
        // invoke remotely method that live in other service, based on .proto file
        return this.subscribersService.getAllSubscribers({});
    }

    @Post()
    @UseGuards(JwtAuthenticationGuard)
    async createPost(@Body() subscriber: CreateSubscriberDto) {
        return this.subscribersService.addSubscriber(subscriber);
    }
}
