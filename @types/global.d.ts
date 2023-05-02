declare global {
  type Maybe<T> = T | null | undefined;
}

declare module "vite-plugin-vsharp";

declare module "*.jpg" {
  const path: string;
  export default path;
}

declare module "*.jpeg" {
  const path: string;
  export default path;
}

declare module "*.gif" {
  const path: string;
  export default path;
}

declare module "*.png" {
  const path: string;
  export default path;
}

declare module "*.webp" {
  const path: string;
  export default path;
}
