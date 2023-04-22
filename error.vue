<script setup lang="ts">
// Still working on getting exact type correct
// based on what actually gets passed through.
interface AppError  {
  url?: string; 
  statusCode: number; 
  statusMessage?: string;
  message: string; 
  description?: string; 
  data?: any; 
  fatal: boolean;
  cause?: string; 
  name: string; 
  stack: string; 
};

function isAppError(arg: unknown): arg is AppError{
  return  !!arg &&
  typeof arg === "object";   
}

const error = useError();
if (!isAppError(error.value)) throw new Error("Unknown error type or error is undefined");
const {url, statusCode, statusMessage, message, description, data, fatal, cause, name, stack } = error.value;

const handleError = () => {
  clearError({ redirect: "/course" });
};
</script>

<template>
  <NuxtLayout>
    <div class="prose text-center max-w-full">
      <h1 v-if="fatal">Fatal Error</h1>
      <h2 v-if="name">Name: {{ name }}</h2>
      <h2 v-if="statusCode">{{ statusCode }}</h2>
      <h2 v-if="statusMessage">{{ statusMessage }}</h2>
      <p v-if="cause">Reason: {{  cause }}</p>
      <p v-if="message">msssage: {{ message }}</p>
      <p v-if="url">URL: {{ url }}</p>
      <p v-if="description">description: {{ description }}</p>
      <p v-if="data">data: {{ data }}</p>
      <p v-if="stack" class="text-left">
        <pre>{{ stack }}</pre>
      </p>
      <div class="prose text-center max-w-full">
        <p>
          Go to
          <a @click="handleError" class="hover:cursor-pointer">course home</a>
        </p>
      </div>
    </div>
  </NuxtLayout>
</template>
