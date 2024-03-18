import React from "react";
import Question from "../components/Question";
import { quiz } from "../data";
const data = [
  {
    question: "What is your favorite color?",
    options: ["Red", "Blue", "Green"],
  },
  {
    question: "What is your favorite animal?",
    options: ["Dog", "Cat", "Bird"],
  },
  // Add more questions as needed
];
// Example of correct initialization before usage
// const quiz = {
//   totalQuestions: 10,
//   questions: ["a", "b", "c"],
// };

// Usage
const questions = quiz.questions;
console.log(quiz.questions); // This should work assuming quiz is defined and initialized correctly.

const page = () => {
  return (
    <div>
      <h1>{quiz.totalQuestions}</h1>
      <div>
        {questions.map((item, index) => (
          <Question
            key={index}
            question={item.question}
            options={item.options}
            correctAnswer={item.correctAnswer}
          />
        ))}
      </div>
    </div>
  );
};

export default page;
