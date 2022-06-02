import {Controller, Post, Req, Headers, BadRequestException} from '@nestjs/common';
import {StripeService} from "../stripe/stripe.service";
import RequestWithRawBody from "./interfaces/request-with-raw-body.interface";
import {UsersService} from "../users/users.service";
import StripeWebhookService from './stripe-webhook.service';

@Controller('stripe-webhook')
export class StripeWebhookController {
    constructor(
        private readonly stripeService: StripeService,
        private readonly usersService: UsersService,
        private readonly stripeWebhookService: StripeWebhookService
    ) {
    }

    @Post()
    async handleIncomingEvents(
        @Headers('stripe-signature') signature: string,
        @Req() request: RequestWithRawBody
    ) {
        if (!signature) {
            throw new BadRequestException('Missing stripe-signature header');
        }

        const event = await this.stripeService.constructEventFromPayload(signature, request.rawBody);

        if (event.type === 'customer.subscription.updated' || event.type === 'customer.subscription.created') {
            return this.stripeWebhookService.processSubscriptionUpdate(event);
        }
    }
}
