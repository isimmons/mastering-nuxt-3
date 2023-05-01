import { PrismaClient } from "@prisma/client";
import protectRoute from "~/server/utils/protectRoute";

import { assertIsSlugObject } from "~/utils";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  // Only allow PUT, PATCH, or POST requests
  assertMethod(event, ["PUT", "PATCH", "POST"]);

  protectRoute(event);

  assertIsSlugObject(event.context.params);
  const { chapterSlug, lessonSlug } = event.context.params;

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

  const { completed } = await readBody(event);

  const {
    user: { email: userEmail },
  } = event.context;

  return await prisma.lessonProgress.upsert({
    where: {
      lessonId_userEmail: {
        lessonId: lesson.id,
        userEmail,
      },
    },
    update: {
      completed,
    },
    create: {
      completed,
      userEmail,
      Lesson: {
        connect: {
          id: lesson.id,
        },
      },
    },
  });
});
