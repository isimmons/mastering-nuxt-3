<script setup lang="ts">
import { loadStripe } from "@stripe/stripe-js";

import { assertNotNull } from "~/utils";

import type { Stripe, StripeCardElement } from "@stripe/stripe-js";

const course = await useCourse();
const config = useRuntimeConfig();
const stripe = ref<Stripe | null>(null);
const card = ref<StripeCardElement | null>(null);
const email = ref<string>("");
const processingPayment = ref<boolean>(false);
const paymentIntentId = ref<string | null>(null);
const success = ref<boolean>(false);

const formStyle = {
  base: {
    fontSize: "16px",
    color: "#3d4852",
    "::placeholder": {
      color: "#8795a1",
    },
  },
};

const elements = computed(() => stripe.value?.elements());

const setupStripe = async () => {
  // stripe.value = Stripe(config.public.stripeKey);
  stripe.value = await loadStripe(config.public.stripeKey);

  if (!card.value && elements.value) {
    card.value = elements.value.create("card", {
      style: formStyle,
    });
    card.value.mount("#card-element");
  }
};

const handleSubmit = async () => {
  if (!stripe.value || !card.value) return;
  if (email.value === "") {
    return;
  }

  processingPayment.value = true;
  let secret: string = "";

  try {
    // Create a PaymentIntent with the order amount and currency set on the server end
    const response = await $fetch("/api/stripe/paymentIntent", {
      method: "POST",
      body: {
        email: email.value,
      },
    });

    secret = response || "";
  } catch (e) {
    console.log(e);
  }

  try {
    const response = await stripe.value.confirmCardPayment(secret, {
      payment_method: {
        card: card.value,
      },
      receipt_email: email.value,
    });

    if (response.paymentIntent?.status === "succeeded") {
      success.value = true;
      paymentIntentId.value = response.paymentIntent.id;
    }
  } catch (e) {
    console.log(e);
  } finally {
    processingPayment.value = false;
  }
};

const login = async () => {
  if (!paymentIntentId.value) return;

  await navigateTo(
    `/login?redirectTo=/linkWithPurchase/${paymentIntentId.value}`
  );
};

setupStripe();
</script>

<template>
  <Modal @close="$emit('close')">
    <div class="bg-slate-200 p-8 rounded-xl w-full max-w-2xl">
      <div
        v-if="success"
        class="flex flex-col justify-center items-center space-y-6"
      >
        <h2 class="text-xl font-bold">Thanks for buying the course!</h2>
        <button
          @click="login"
          class="mt-4 w-full text-md text-black h-12 px-16 rounded focus:outline-none focus:shadow-outline flex items-center justify-center transition bg-blue-300 hover:bg-blue-200"
        >
          Login with Github to access
        </button>
      </div>
      <form v-else @submit.prevent="handleSubmit">
        <h2 class="font-bold text-xl text-center">Buying {{ course.title }}</h2>
        <div class="mt-8 text-base width bg-white py-6 px-8 rounded shadow-md">
          <div class="w-full flex justify-between items-center mb-8">
            <label class="font-bold"> Email </label>
            <input
              class="input ml-6 focus:outline-none text-left w-full"
              type="email"
              autocomplete="email"
              template
              v-model="email"
              placeholder="your@email.com"
              required
            />
          </div>

          <div id="card-element">
            <!-- Elements will create input elements here -->
          </div>
        </div>

        <button
          class="font-sans mt-4 w-full text-lg text-black h-12 px-16 rounded focus:outline-none focus:shadow-outline font-bold flex items-center justify-center transition"
          :class="
            processingPayment || email === ''
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-yellow-300 hover:bg-yellow-200 cursor-pointer'
          "
          :disabled="processingPayment || email === ''"
        >
          <Loading v-if="processingPayment" class="h-5 w-5" />
          <div v-else>Pay $97</div>
        </button>
      </form>
    </div>
  </Modal>
</template>
