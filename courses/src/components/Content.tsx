import { CoursePart } from "../types";
import Part from "./Part"

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <div>
      {courseParts.map((course) => {
        return (
          <Part part={course} key={course.name} />
        );
      })}
    </div>
  );
};

export default Content