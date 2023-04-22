export function assertIsTypeString(arg: unknown): asserts arg is string {
  if (!!arg && typeof arg === "string") {
    return;
  } else {
    throw new Error("argument is not of type string");
  }
}
