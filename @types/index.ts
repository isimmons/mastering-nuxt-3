export type Course = {
  title: string;
  chapters: Chapter[];
  firstLesson: Lesson;
};

export type Chapter = {
  title: string;
  slug: string;
  number: number;
  lessons: Lesson[];
};

export type Lesson = {
  title: string;
  slug: string;
  path: string;
  number: number;
  downloadUrl: string;
  videoId: string;
  text: string;
  sourceUrl?: string;
};
