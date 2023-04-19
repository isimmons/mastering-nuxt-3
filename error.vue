<script setup lang="ts">
// type based on NuxtError, H3Error  and Error types
// because I don't know yet what type errors I might get here.
// more research and testing neeeded
interface AppError {
  url?: string;
  statusCode?: number;
  statusMessage?: string;
  message?: string;
  description?: string;
  stack?: string;
  data?: any;
}

const error = useError() as Ref<AppError>;

const handleError = () => {
  clearError({ redirect: "/course" });
};
</script>

<template>
  <NuxtLayout>
    <div class="prose text-center">
      <h1>{{ error.statusCode }} - {{ error.statusMessage }}</h1>
      <h2>{{ error.message }}</h2>
      <p><strong>URL: </strong> {{ error.url }}</p>
      <pre v-if="error.stack">{{ error.stack }}</pre>
      <div class="prose">
        <p>
          Go to
          <a @click="handleError" class="hover:cursor-pointer">course home</a>
        </p>
      </div>
    </div>
  </NuxtLayout>
</template>
