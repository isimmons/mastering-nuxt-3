import { PrismaClient } from "@prisma/client";
import protectRoute from "~/server/utils/protectRoute";

import { assertIsSlugObject } from "~/utils";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  assertIsSlugObject(event.context.params);
  const { lessonSlug, chapterSlug } = event.context.params;

  if (chapterSlug !== "1-chapter-1") protectRoute(event);

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
