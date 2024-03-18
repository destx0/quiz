"use client";
import React from "react";

const Question = ({ question, options, correctAnswer }) => {
  const [answered, setAnswered] = React.useState(false);
  const [selected, setSelected] = React.useState("");
  const [correct, setCorrect] = React.useState(false);
  const [answerIdx, setAnswerIdx] = React.useState(null);
  return (
    <div>
      <h2>{question}</h2>
      <p>{correctAnswer}</p>
      {options.map((option, index) => (
        <>
          <button key={index}>{option}</button>
        </>
      ))}
    </div>
  );
};

export default Question;
