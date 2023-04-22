<script setup lang="ts">
type AppError = {
  fatal: boolean;
  url?: string;
  statusCode: number;
  statusMessage: string;
  message: string;
  description: string;
  data?: any;
  stack: string;
};

// narrows error.value to intersection of AppError & Error but not null or undefined
function isAppError(arg: unknown): arg is AppError {
  return  !!arg &&
  typeof arg === "object";   
}

const error = useError();
if (!isAppError(error.value)) throw new Error("Unknown error type or error is undefined");
const { fatal, url, statusCode, statusMessage, message, description, data, stack } = error.value;

const handleError = () => {
  clearError({ redirect: "/course" });
};
</script>

<template>
  <NuxtLayout>
    <div class="prose text-center max-w-full">
      <h1 v-if="fatal">Fatal Error</h1>
      <h2>{{ statusCode }} - {{ statusMessage }}</h2>
      
      <h2>{{ message }}</h2>
      <p v-if="url"><strong>URL: </strong> {{ url }}</p>
      <p v-if="stack" class="text-left">
        <pre>{{ stack }}</pre>
      </p>
      <p v-if="description">{{ description }}</p>
      <p v-if="data">data: {{ data }}</p>
      <div class="prose text-center max-w-full">
        <p>
          Go to
          <a @click="handleError" class="hover:cursor-pointer">course home</a>
        </p>
      </div>
    </div>
  </NuxtLayout>
</template>
