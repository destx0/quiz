"use client";
import React from "react";
import Question from "../components/Question";
import { quiz } from "../data";
import Submit from "../components/Submit";

const questions = quiz.questions;

const page = () => {
  const [counter, setCounter] = React.useState([]);
  const [correctList, setCorrectList] = React.useState(
    new Array(questions.length).fill(false)
  );
  const [showResults, setShowResults] = React.useState(false);
  const handleSubmit = () => {
    setShowResults(true);
  };
  const increaseCounter = (id) => {
    if (!counter.includes(id)) setCounter((prev) => [...prev, id]);
  };

  return (
    <div>
      <h1>
        {counter.length}/{questions.length}
      </h1>
      <button onClick={handleSubmit}>Submit</button>
      <div>
        {questions.map((item, index) => (
          <Question
            key={index}
            qId={index}
            question={item.question}
            options={item.options}
            correctAnswer={item.correctAnswer}
            showResults={showResults}
            increaseCounter={increaseCounter}
          />
        ))}
      </div>
    </div>
  );
};

export default page;
