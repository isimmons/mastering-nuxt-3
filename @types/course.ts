import type { Lesson as PrismaLesson } from "@prisma/client";

export type Course = {
  title: string;
  chapters: Chapter[];
};

export type Chapter = {
  title: string;
  slug: string;
  number: number;
  lessons: Lesson[];
};

export type Lesson = PrismaLesson & {
  path?: string;
};
