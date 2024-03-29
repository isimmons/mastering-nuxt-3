import type { Lesson } from "~/@types";

export default async (chapterSlug: string, lessonSlug: string) => {
  return await useFetchWithCache<Lesson>(
    `/api/course/chapter/${chapterSlug}/lesson/${lessonSlug}`
  );
};
