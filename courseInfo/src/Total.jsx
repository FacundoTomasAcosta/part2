const Total = (props) => {
  const exercises = props.parts.map((part) => part.exercises);
  const total = exercises.reduce((total, exercises) => total + exercises, 0);

  return (
    <p>
      <b>Number of exercises {total}</b>
    </p>
  );
};

export default Total;
