<script setup lang="ts">
const { chapters } = useCourse();

const route = useRoute();

const isActiveLink = (lessonPath: string): boolean => {
  return lessonPath === route.fullPath;
};

const resetError = async (error: Ref<Error | null>) => {
  await navigateTo(
    "/course/chapter/1-chapter-1/lesson/1-introduction-to-typescript-with-vue-js-3"
  );
  error.value = null;
};
</script>

<template>
  <div class="prose mb-12">
    <h1>
      <span class="font-medium">
        Course:
        <span class="font-bold">Mastering Nuxt 3</span>
      </span>
    </h1>
  </div>

  <div class="flex flex-row justify-center flex-grow">
    <div
      class="prose mr-4 p-8 bg-white rounded-md min-w-[20ch] max-w-[30ch] flex flex-col"
    >
      <h3>Chapters</h3>
      <div v-for="chapter in chapters" :key="chapter.slug">
        <h4>{{ chapter.title }}</h4>
        <NuxtLink
          v-for="(lesson, index) in chapter.lessons"
          :key="lesson.slug"
          class="flex flex-row space-x-1 no-underline prose-sm font-normal py-1 px-4 -mx-4"
          :to="lesson.path"
          :class="{
            'text-blue-500': isActiveLink(lesson.path),
            'text-gray-600': !isActiveLink(lesson.path),
          }"
        >
          <span class="text-gray-500">{{ index + 1 }}.</span>
          <span>{{ lesson.title }}</span>
        </NuxtLink>
      </div>
    </div>

    <div class="prose p-12 bg-white rounded-md w-[65ch]">
      <NuxtErrorBoundary>
        <NuxtPage />
        <template #error="{ error }">
          <p>Sorry Charlie! The milk's no good!</p>
          <p>{{ error }}</p>
          <p>
            <button
              class="hover:cursor-pointer bg-gray-500 text-white font-bold py-1 px-3 rounded"
              @click="resetError(error)"
            >
              Reset
            </button>
          </p>
        </template>
      </NuxtErrorBoundary>
    </div>
  </div>
</template>
