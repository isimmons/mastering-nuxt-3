import { H3Event } from "h3";

import { assertIsTypeString } from "~/utils";

export default async (event: H3Event) => {
  if (!event.context.user) {
    throw createError({
      statusCode: 401,
      message: "Unauthorized",
    });
  }

  const cookie = getHeader(event, "cookie");
  assertIsTypeString(cookie);
  const hasAccess = await $fetch("/api/user/hasAccess", {
    headers: {
      cookie: cookie,
    },
  });

  if (!hasAccess) {
    throw createError({
      statusCode: 401,
      message: "Unauthorized",
    });
  }
};

// export default (event: H3Event) => {
//   if (!event.context.user) {
//     throw createError({
//       statusCode: 401,
//       statusMessage: "Unauthorized",
//     });
//   }
// };
