import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

const Course = (props) => {
  return (
    <div>
      <Header course={props.singleCourse} />
      <Content parts={props.singleCourse.parts} />
      <Total parts={props.singleCourse.parts} />
    </div>
  );
};

export default Course;
