import { render, screen, fireEvent } from "@testing-library/react";
import { CourseItem } from "./course-item";

describe("course item", () => {
  test("should call delete callback", () => {
    const onDelete = jest.fn();

    render(
      <CourseItem
        course={{
          id: "32432r314frgr",
          description: "описание",
          name: "название",
        }}
        onDelete={onDelete}
      />,
    );

    fireEvent.click(screen.getByText("Удалить"));

    expect(onDelete).toHaveBeenCalled();
  });
});
