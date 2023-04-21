import course from "~/server/courseData";

import type { Course, Chapter } from "~/@types";

course as Course;

type ChapterMeta = {
  title: string;
  slug: string;
  number: number;
  lessons: LessonMeta[];
};

type LessonMeta = {
  title: string;
  slug: string;
  number: number;
  path: string;
};

type CourseMeta = {
  title: string;
  chapters: ChapterMeta[];
};

export default defineEventHandler((event): CourseMeta => {
  const chapterMeta: ChapterMeta[] = course.chapters.reduce(
    (prev: ChapterMeta[], next: Chapter) => {
      const lessons: LessonMeta[] = next.lessons.map((lesson) => ({
        title: lesson.title,
        slug: lesson.slug,
        number: lesson.number,
        path: `/course/chapter/${next.slug}/lesson/${lesson.slug}`,
      }));

      const chapter: ChapterMeta = {
        title: next.title,
        slug: next.slug,
        number: next.number,
        lessons,
      };

      return [...prev, chapter];
    },
    []
  );

  return {
    title: course.title,
    chapters: chapterMeta,
  };
});
