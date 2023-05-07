import { PrismaClient } from "@prisma/client";

import { assertHasParam } from "~/utils";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  assertHasParam(event.context.user, "email");
  const { email } = event.context.user;

  const coursePurchases = await prisma.coursePurchase.findMany({
    where: {
      userEmail: email,
      verified: true,
      courseId: 1,
    },
  });

  return coursePurchases.length > 0;
});
