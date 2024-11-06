export type CourseListElement = {
  id: string;
  name: string;
  description: string;
};

export type CreateListElementCommand = {
  name: string;
  description: string;
};

export type DeleteCourseListElementCommand = {
  id: string;
};
