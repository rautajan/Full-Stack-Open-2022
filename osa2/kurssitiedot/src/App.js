import Course from "./Components/Course";

const Total = (props) => {
  return (
    <>
      <p>
        Number of exercises{" "}
        {props.parts[0].exercises +
          props.parts[1].exercises +
          props.parts[2].exercises}
      </p>
    </>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    id: 1,
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3
      },
      { name: "Redux", exercises: 11, id:4 },
    ],
    
  };

  return (
    <div>
      <Course course={course} />
      {/* <Header course={course.name} /> */}
      {/* <Content parts={course.parts} /> */}
      {/* <Total parts={course.parts} /> */}
    </div>
  );
};

export default App;
