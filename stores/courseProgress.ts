import { defineStore } from "pinia";

export const useCourseProgress = defineStore("courseProgress", () => {
  const progress = useLocalStorage<Record<string, Record<string, boolean>>>(
    "progress",
    {}
  );
  const initialized = ref<boolean>(false);

  async function initialize() {
    if (initialized.value) return;
    initialized.value = true;
  }

  const toggleComplete = async (chapter: string, lesson: string) => {
    const user = useSupabaseUser();
    if (!user.value) return;

    // currently we havn't made chapter and lesson optional so not sure why we
    // are doing this
    if (!chapter || !lesson) {
      const {
        params: { chapterSlug, lessonSlug },
      } = useRoute();
      assertIsTypeString(chapterSlug);
      assertIsTypeString(lessonSlug);
      chapter = chapterSlug;
      lesson = lessonSlug;
    }

    const currentProgress = progress.value[chapter][lesson];

    progress.value[chapter] = {
      ...progress.value[chapter],
      [lesson]: !currentProgress,
    };
  };

  return {
    initialize,
    progress,
    toggleComplete,
  };
});
