import course from "~/server/courseData";

import type { Course, Chapter, Lesson } from "~/@types";

course as Course;

export default defineEventHandler((event): Lesson => {
  const { chapterSlug, lessonSlug } = event.context.params || {};

  const chapter: Maybe<Chapter> = course.chapters.find(
    (chapter) => chapter.slug === chapterSlug
  );

  if (!chapter) {
    throw createError({
      statusCode: 404,
      statusMessage: "Not Found",
      message: "Chapter not found",
    });
  }

  const lesson: Maybe<Lesson> = chapter.lessons.find(
    (lesson) => lesson.slug === lessonSlug
  );

  if (!lesson) {
    throw createError({
      statusCode: 404,
      statusMessage: "Not Found",
      message: "Lesson not found",
    });
  }

  return {
    ...lesson,
    path: `/course/chapter/${chapterSlug}/lesson/${lessonSlug}`,
  };
});
