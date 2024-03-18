"use client";
import React from "react";

const Question = ({ question, options, correctAnswer, showResults }) => {
  const [answered, setAnswered] = React.useState(false);
  const [selected, setSelected] = React.useState("");
  const [correct, setCorrect] = React.useState(false);

  const handleOptionClick = (option) => {
    setSelected(option);
    setAnswered(true);
  };
  return (
    <div>
      <h2>{question}</h2>
      {selected && <p>selected: {selected}</p>}
      {showResults &&
        (correctAnswer !== selected ? (
          <p>Correct Answer: {correctAnswer}</p>
        ) : (
          <p>Correct!</p>
        ))}
      {options.map((option, index) => (
        <>
          <button key={index} onClick={() => handleOptionClick(option)}>
            {option}
          </button>
        </>
      ))}
    </div>
  );
};

export default Question;
