import Header from "./Header";
import Content from "./Content";

const Course = ({course}) => {
  const total = course.parts.reduce(
    (sum, currentValue) => (sum += currentValue.exercises),
    0
  );
  return (
    <>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <b>total of {total} exercises</b>
    </>
  );
};

export default Course;
