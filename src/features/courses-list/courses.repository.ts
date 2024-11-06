import { dbClient } from "@/shared/lib/db";
import { cache } from "react";
import {
  CourseListElement,
  CreateListElementCommand,
  DeleteCourseListElementCommand,
} from "./model/type";

class СourseRepository {
  getCoursesList = cache(
    (): Promise<CourseListElement[]> => dbClient.course.findMany(),
  );

  createCourseElement = (
    command: CreateListElementCommand,
  ): Promise<CourseListElement> => {
    return dbClient.course.create({
      data: command,
    });
  };

  deleteCourseElement = (command: DeleteCourseListElementCommand) => {
    return dbClient.course.delete({
      where: { id: command.id },
    });
  };
}

export const courseRepository = new СourseRepository();
