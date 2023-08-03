const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => {
    return sum + part.exercises;
  }, 0);

  return (
    <div>
      <b>total of exercises {total}</b>
    </div>
  );
};

export default Total;
