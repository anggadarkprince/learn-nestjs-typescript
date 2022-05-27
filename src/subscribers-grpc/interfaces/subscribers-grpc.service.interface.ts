import CreateSubscriberDto from '../../subscribers/dto/create-subscriber.dto';
import SubscriberGrpc from './subscriber-grpc.interface';

interface SubscribersGrpcService {
    addSubscriber(subscriber: CreateSubscriberDto): Promise<SubscriberGrpc>
    getAllSubscribers(params: {}): Promise<SubscriberGrpc>
}

export default SubscribersGrpcService;