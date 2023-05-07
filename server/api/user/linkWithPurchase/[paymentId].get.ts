import { PrismaClient } from "@prisma/client";

import { assertHasParam } from "~/utils";

const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  assertHasParam(event.context.params, "paymentId");
  const { paymentId } = event.context.params;

  const user = event.context.user;

  try {
    await prisma.coursePurchase.update({
      where: {
        paymentId,
      },
      data: {
        userEmail: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    throw createError({
      statusCode: 500,
      statusMessage: "Error linking course purchase",
    });
  }

  return 200;
});
