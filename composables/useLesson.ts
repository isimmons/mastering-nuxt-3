import { StorageSerializers } from "@vueuse/core";

import type { Lesson } from "~/@types";

export default async (chapterSlug: string, lessonSlug: string) => {
  const url = `/api/course/chapter/${chapterSlug}/lesson/${lessonSlug}`;

  const lesson = useSessionStorage<Lesson>(url, null, {
    serializer: StorageSerializers.object,
  });

  if (!lesson.value) {
    const { data, error } = await useFetch<Lesson>(url);

    if (error.value) {
      throw createError({
        ...error.value,
        statusMessage: `Could not fetch lesson ${lessonSlug} in chapter ${chapterSlug}`,
      });
    }

    lesson.value = data.value;
  }

  return lesson;
};
