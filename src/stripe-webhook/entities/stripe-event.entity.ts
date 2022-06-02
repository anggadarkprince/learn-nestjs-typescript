import {Entity, PrimaryColumn} from 'typeorm';

@Entity({name: 'stripe_events'})
class StripeEvent {
    @PrimaryColumn()
    public id: string;
}

export default StripeEvent;