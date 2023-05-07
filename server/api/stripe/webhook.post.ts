import { PrismaClient } from "@prisma/client";

import stripe, { DiscriminatedEvent } from "../../services/stripe";

type PaymentIntentId = {
  id: string;
};

const prisma = new PrismaClient();
const STRIPE_WEBHOOK_SECRET = useRuntimeConfig().stripeWebhookSecret;

const throwInvalidSignatureError = () => {
  throw createError({
    statusCode: 400,
    statusMessage: "Invalid signature",
  });
};

export default defineEventHandler(async (event) => {
  const signature = getHeader(event, "stripe-signature");
  const body = await readRawBody(event);

  if (!body || !signature) return throwInvalidSignatureError();

  // Verify the webhook signature
  let stripeEvent;
  try {
    stripeEvent = stripe.webhooks.constructEvent(
      body,
      signature,
      STRIPE_WEBHOOK_SECRET
    ) as DiscriminatedEvent;
  } catch (error) {
    console.error(error);
    return throwInvalidSignatureError();
  }

  if (stripeEvent.type === "payment_intent.succeeded") {
    await handlePaymentIntentSucceeded(stripeEvent.data.object);
  } else if (stripeEvent.type === "payment_intent.payment_failed") {
    await handlePaymentIntentFailed(stripeEvent.data.object);
  }

  return 200;
});

async function handlePaymentIntentSucceeded(paymentIntent: PaymentIntentId) {
  // Verify the related course purchase
  try {
    await prisma.coursePurchase.update({
      where: {
        paymentId: paymentIntent.id,
      },
      data: {
        verified: true,
      },
    });
  } catch (error) {
    console.error(error);
    throw createError({
      statusCode: 500,
      statusMessage: "Error verifying purchase",
    });
  }
}

async function handlePaymentIntentFailed(paymentIntent: PaymentIntentId) {
  // Clean up the course purchase
  try {
    await prisma.coursePurchase.delete({
      where: {
        paymentId: paymentIntent.id,
      },
    });
  } catch (error) {
    console.error(error);
    throw createError({
      statusCode: 500,
      statusMessage: "Error removing purchase",
    });
  }
}
