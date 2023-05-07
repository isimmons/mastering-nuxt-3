import stripe from "stripe";
const config = useRuntimeConfig();
const Stripe = new stripe(config.stripeSecret, { apiVersion: "2022-11-15" });

export default Stripe;
