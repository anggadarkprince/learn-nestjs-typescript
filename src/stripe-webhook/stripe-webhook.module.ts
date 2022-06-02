import { Module } from '@nestjs/common';
import { StripeWebhookController } from './stripe-webhook.controller';
import {StripeModule} from "../stripe/stripe.module";
import {UsersModule} from "../users/users.module";
import { StripeWebhookService } from './stripe-webhook.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import StripeEvent from "./entities/stripe-event.entity";

@Module({
  imports: [StripeModule, UsersModule, TypeOrmModule.forFeature([StripeEvent]),],
  controllers: [StripeWebhookController],
  providers: [StripeWebhookService]
})
export class StripeWebhookModule {}
