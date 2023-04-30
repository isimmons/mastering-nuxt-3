export function assertNotNull<T>(arg: unknown): arg is T {
  if (!!arg) return true;

  throw new Error("argument is null or undefined");
}

export function assertIsTypeString(arg: unknown): asserts arg is string {
  if (!!arg && typeof arg === "string") {
    return;
  } else {
    throw new Error("argument is not of type string");
  }
}

export function assertIsSlugObject(arg: unknown): asserts arg is {
  lessonSlug: string;
  chapterSlug: string;
} {
  if (
    !!arg &&
    typeof arg === "object" &&
    "lessonSlug" in arg &&
    "chapterSlug" in arg
  ) {
    return;
  } else {
    throw new Error("argument is not of type string");
  }
}
