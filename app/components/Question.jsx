"use client";
import React from "react";

const Question = ({
  qId,
  question,
  options,
  correctAnswer,
  showResults,
  increaseCounter,
}) => {
  const [answered, setAnswered] = React.useState(false);
  const [selected, setSelected] = React.useState("");
  const [correct, setCorrect] = React.useState(false);

  const handleOptionClick = (option, key) => {
    setSelected(option);
    setAnswered(true);
    increaseCounter(qId);
  };
  return (
    <div>
      <h2>{question}</h2>

      {showResults &&
        (correctAnswer !== selected ? (
          <p>Correct Answer: {correctAnswer}</p>
        ) : (
          <p>Correct!</p>
        ))}
      {options.map((option, index) => (
        <>
          <button
            key={index}
            onClick={() => handleOptionClick(option, qId)}
            style={{
              backgroundColor: option === selected ? "#4CAF50" : "#f0f0f0",
              color: option === selected ? "white" : "black",
            }}
          >
            {option}
          </button>
        </>
      ))}
    </div>
  );
};

export default Question;
