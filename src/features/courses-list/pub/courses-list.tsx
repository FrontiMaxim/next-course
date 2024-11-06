import { revalidatePath } from "next/cache";
import { courseRepository } from "../courses.repository";
import { CourseItem } from "../ui/course-item";
import { cn } from "@/shared/lib/utils";

export async function CoursesList({
  revalidatePagePath,
  className,
}: {
  revalidatePagePath: string;
  className?: string;
}) {
  const coursesList = await courseRepository.getCoursesList();

  const handelDeleteAction = async (courseId: string) => {
    "use server";

    await courseRepository.deleteCourseElement({ id: courseId });

    revalidatePath(revalidatePagePath);
  };

  return (
    <div className={cn(className, "flex flex-col gap-3")}>
      {coursesList.map((course) => (
        <CourseItem
          course={course}
          onDelete={handelDeleteAction.bind(null, course.id)}
          key={course.id}
        />
      ))}
    </div>
  );
}
