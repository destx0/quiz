"use client";
import React from "react";
import Question from "../components/Question";
import { quiz } from "../data";
import Submit from "../components/Submit";

const questions = quiz.questions;

const page = () => {
  const [showResults, setShowResults] = React.useState(false);
  const handleSubmit = () => {
    setShowResults(true);
  };

  return (
    <div>
      <h1>{quiz.totalQuestions}</h1>
      <button onClick={handleSubmit}>Submit</button>
      <div>
        {questions.map((item, index) => (
          <Question
            key={index}
            question={item.question}
            options={item.options}
            correctAnswer={item.correctAnswer}
            showResults={showResults}
          />
        ))}
      </div>
    </div>
  );
};

export default page;
