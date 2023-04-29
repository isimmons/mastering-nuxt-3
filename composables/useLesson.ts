import type { Lesson } from "~/@types";

export default async (chapterSlug: string, lessonSlug: string) => {
  return useFetchWithCache<Lesson>(
    `/api/course/chapter/${chapterSlug}/lesson/${lessonSlug}`
  );
};
