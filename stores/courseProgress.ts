import { defineStore } from "pinia";

export const useCourseProgress = defineStore("courseProgress", () => {
  const progress = ref<Record<string, Record<string, boolean>>>({});

  const initialized = ref<boolean>(false);

  async function initialize() {
    if (initialized.value) return;
    initialized.value = true;
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
