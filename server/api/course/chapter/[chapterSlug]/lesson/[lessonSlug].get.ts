import { PrismaClient } from "@prisma/client";

import { assertIsSlugObject } from "~/utils";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  assertIsSlugObject(event.context.params);
  const { lessonSlug, chapterSlug } = event.context.params;

  const lesson = await prisma.lesson.findFirst({
    where: {
      slug: lessonSlug,
      Chapter: {
        slug: chapterSlug,
      },
    },
  });

  if (!lesson) {
    throw createError({
      statusCode: 404,
      statusMessage: "Lesson not found",
    });
  }

  return {
    ...lesson,
    path: `/course/chapter/${chapterSlug}/lesson/${lessonSlug}`,
  };
});
