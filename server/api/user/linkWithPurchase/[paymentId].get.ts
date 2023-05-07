import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
import protectRoute from "~/server/utils/protectRoute";
import { assertHasParam } from "~/utils";
export default defineEventHandler(async (event) => {
  protectRoute(event);

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
