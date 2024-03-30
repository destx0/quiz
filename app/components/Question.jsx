"use client";
import React, { useState, useEffect } from "react";

const Question = ({
  qId,
  question,
  options,
  correctAnswer,
  showResults,
  increaseAttempted,
  resetTimestamp,
}) => {
  const [selected, setSelected] = React.useState("");
  const [correct, setCorrect] = React.useState(false);

  const handleOptionClick = (option) => {
    if (showResults) {
      return;
    }
    setSelected(option);
    increaseAttempted(qId);
  };

  useEffect(() => {
    // Reset the local state when the resetTimestamp changes
    setSelected("");
  }, [resetTimestamp]);

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
