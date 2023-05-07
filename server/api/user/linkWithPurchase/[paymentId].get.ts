import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
import protectRoute from "~/server/utils/protectRoute";
export default defineEventHandler(async (event) => {
  protectRoute(event);
  if (!event.context.params) throw new Error("Missing paymentId parameter...");
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
