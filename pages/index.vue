<script setup lang="ts">
const { firstLesson } = useCourse();
</script>

<template>
  <NuxtLink :to="firstLesson.path" class="underline font-medium">
    Get started with your first lesson
  </NuxtLink>
</template>
