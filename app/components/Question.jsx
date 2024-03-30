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
  const [selected, setSelected] = React.useState(null);
  const [correct, setCorrect] = React.useState(false);

  const handleOptionClick = (index, qId) => {
    if (showResults) {
      return;
    }
    let old = selected;
    let adjustment = 0;
    setSelected(index);
    if (index === correctAnswer) {
      adjustment = 1;
      if (old === correctAnswer) {
        adjustment = 0;
      }
    } else {
      if (old === correctAnswer) {
        adjustment = -1;
      }
    }
    const isCorrect = index === correctAnswer;
    increaseAttempted(qId, adjustment);
  };

  useEffect(() => {
    // Reset the local state when the resetTimestamp changes
    setSelected(null);
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
        <div key={index}>
          <button
            key={index}
            onClick={() => handleOptionClick(index, qId)}
            style={{
              backgroundColor: index === selected ? "#4CAF50" : "#f0f0f0",
              color: index === selected ? "white" : "black",
            }}
          >
            {option}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Question;
