import type { Lesson as PrismaLesson } from "@prisma/client";

export type Lesson = PrismaLesson & {
  path?: string;
};

export type ChapterProgress = {
  [key: string]: boolean;
};

export type CourseProgress = {
  [key: string]: ChapterProgress;
};
