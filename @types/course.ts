import type { Lesson as PrismaLesson } from "@prisma/client";

export type Lesson = PrismaLesson & {
  path?: string;
};
