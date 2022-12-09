import { CoursePart } from "../types";

const Part = ({ part }: { part: CoursePart }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };
  switch (part.type) {
    case "normal":
      return (
        <div>
          <h3>
            {part.name} {part.exerciseCount}
          </h3>
          <i>{part.description}</i>
        </div>
      );
    case "groupProject":
      return (
        <div>
          <h3>
            {part.name} {part.exerciseCount}
          </h3>
          <p>project exercises {part.groupProjectCount}</p>
        </div>
      );
    case "submission":
      return (
        <div>
          <h3>
            {part.name} {part.exerciseCount}
          </h3>
          <i>{part.description}</i>
          <p>
            submit to{" "}
            <a
              href={part.exerciseSubmissionLink}
              target="_blank"
              rel="noreferrer"
            >
              {part.exerciseSubmissionLink}
            </a>
          </p>
        </div>
      );
    case "special":
      return (
        <div>
          <h3>
            {part.name} {part.exerciseCount}
          </h3>
          <i>{part.description}</i>
          <p>required skills: {part.requirements.join(", ")}</p>
        </div>
      );
    default:
      return assertNever(part);
  }
};

export default Part;
