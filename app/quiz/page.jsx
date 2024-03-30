"use client";
import React from "react";
import Question from "../components/Question";
import { quiz } from "../data";
import Submit from "../components/Submit";

const questions = quiz.questions;

const page = () => {
  const [attempted, setAttempted] = React.useState([]);
  const [correctList, setCorrectList] = React.useState(
    new Array(questions.length).fill(false)
  );
  const [showResults, setShowResults] = React.useState(false);
  const [resetState, setResetState] = React.useState(false);
  const [resetTimestamp, setResetTimestamp] = React.useState(Date.now());

  const handleSubmit = () => {
    setShowResults(true);
  };
  const handleReset = () => {
    setAttempted([]);
    setShowResults(false);
    setResetTimestamp(Date.now());
  };
  const increaseAttempted = (id) => {
    if (!attempted.includes(id)) setAttempted((prev) => [...prev, id]);
    
  };

  return (
    <div>
      <h1>
        {attempted.length}/{questions.length}
      </h1>
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={handleReset}>Reset</button>
      <div>
        {questions.map((item, index) => (
          <Question
            key={index}
            qId={index}
            question={item.question}
            options={item.options}
            correctAnswer={item.correctAnswer}
            showResults={showResults}
            increaseAttempted={increaseAttempted}
            resetTimestamp={resetTimestamp}
          />
        ))}
      </div>
    </div>
  );
};

export default page;
