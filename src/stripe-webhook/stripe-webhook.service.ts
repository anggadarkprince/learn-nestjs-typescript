import {BadRequestException, HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import StripeEvent from './entities/stripe-event.entity';
import {Repository} from 'typeorm';
import Stripe from 'stripe';
import {UsersService} from '../users/users.service';

@Injectable()
export default class StripeWebhookService {
    constructor(
        @InjectRepository(StripeEvent)
        private eventsRepository: Repository<StripeEvent>,
        private readonly usersService: UsersService,
    ) {
    }

    createEvent(id: string) {
        return this.eventsRepository.insert({id});
    }

    async processSubscriptionUpdate(event: Stripe.Event) {
        try {
            await this.createEvent(event.id);
        } catch (error) {
            if ([1062, 1586].includes(error?.code) || error?.code == 'ER_DUP_ENTRY') {
                throw new BadRequestException('This event was already processed');
            }
        }

        const data = event.data.object as Stripe.Subscription;

        const customerId: string = data.customer as string;
        const subscriptionStatus = data.status;

        await this.usersService.updateMonthlySubscriptionStatus(customerId, subscriptionStatus);
    }
}