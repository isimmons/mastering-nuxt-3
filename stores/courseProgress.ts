import { defineStore } from "pinia";

import type { CourseProgress } from "~/@types";

export const useCourseProgress = defineStore("courseProgress", () => {
  const progress = ref<CourseProgress>({});

  const initialized = ref<boolean>(false);

  async function initialize() {
    if (initialized.value) return;
    initialized.value = true;

    const { data: userProgress } = await useFetch<CourseProgress>(
      "/api/user/progress",
      { headers: useRequestHeaders(["cookie"]) }
    );

    if (userProgress.value) {
      progress.value = userProgress.value;
    }
  }

  const toggleComplete = async (chapter: string, lesson: string) => {
    const user = useSupabaseUser();
    if (!user.value) return;

    if (!chapter || !lesson) {
      const {
        params: { chapterSlug, lessonSlug },
      } = useRoute();
      assertIsTypeString(chapterSlug);
      assertIsTypeString(lessonSlug);
      chapter = chapterSlug;
      lesson = lessonSlug;
    }

    const currentProgress = progress.value[chapter]?.[lesson];

    progress.value[chapter] = {
      ...progress.value[chapter],
      [lesson]: !currentProgress,
    };

    // api call
    try {
      await $fetch(`/api/course/chapter/${chapter}/lesson/${lesson}/progress`, {
        method: "POST",
        body: {
          completed: !currentProgress,
        },
      });
    } catch (error) {
      console.error(error);

      progress.value[chapter] = {
        ...progress.value[chapter],
        [lesson]: currentProgress,
      };
    }
  };

  return {
    initialize,
    progress,
    toggleComplete,
  };
});
