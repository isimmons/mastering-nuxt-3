import vsharp from "vite-plugin-vsharp";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    stripeSecret: "",
    stripeWebhookSecret: "",
    public: {
      stripeKey: "",
    },
  },
  nitro: {
    prerender: {
      routes: ["/landing"],
    },
  },
  vite: {
    plugins: [vsharp()],
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
    "@nuxtjs/supabase",
    "@pinia/nuxt",
  ],
  typescript: {
    typeCheck: true,
  },
});
