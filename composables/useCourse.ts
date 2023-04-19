import courseData from "./courseData";

import type { Course } from "~/@types";

export const useCourse = (): Course => {
  return courseData;
};
