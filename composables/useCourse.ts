import { CourseMeta } from "~/@types";

export default async () => {
  return useFetchWithCache<CourseMeta>("/api/course/meta");
};
