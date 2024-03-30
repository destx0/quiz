"use client";
import React from "react";
import Question from "../components/Question";
import { questionsData } from "../data";
import Submit from "../components/Submit";

const questions = questionsData;

const page = () => {
  const [attempted, setAttempted] = React.useState([]);
  const [correctList, setCorrectList] = React.useState(
    new Array(questions.length).fill(false)
  );
  const [score, setScore] = React.useState(0);
  const [showResults, setShowResults] = React.useState(false);
  const [resetState, setResetState] = React.useState(false);
  const [resetTimestamp, setResetTimestamp] = React.useState(Date.now());

  const handleSubmit = () => {
    setShowResults(true);
  };
  const handleReset = () => {
    setScore(0);
    setAttempted([]);
    setShowResults(false);
    setResetTimestamp(Date.now());
  };
  const increaseAttempted = (id, adjustment) => {
    setScore((prevScore) => prevScore + adjustment);
    if (!attempted.includes(id)) setAttempted((prev) => [...prev, id]);
  };

  return (
    <div>
      {showResults && (
        <>
          <h1>
            score={score} total={questions.length}
          </h1>
          <h1>
            attempted={attempted.length} total={questions.length}
          </h1>
        </>
      )}

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
