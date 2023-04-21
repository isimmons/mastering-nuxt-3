export type ChapterMeta = {
  title: string;
  slug: string;
  number: number;
  lessons: LessonMeta[];
};

export type LessonMeta = {
  title: string;
  slug: string;
  number: number;
  path: string;
};

export type CourseMeta = {
  title: string;
  chapters: ChapterMeta[];
};
