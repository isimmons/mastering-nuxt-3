/// <reference types="stripe-event-types" />
import Stripe from "stripe";

export type DiscriminatedEvent = Stripe.DiscriminatedEvent;

const config = useRuntimeConfig();

export default new Stripe(config.stripeSecret, { apiVersion: "2022-11-15" });
