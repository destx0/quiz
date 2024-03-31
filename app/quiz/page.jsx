"use client";
import React from "react";
import Question from "../components/Question";
import { questionsData } from "../data";
import Submit from "../components/Submit";
import Timer from "../components/Timer";
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
		console.log("resetTimestamp", resetTimestamp, showResults);
	};
	const increaseAttempted = (id, adjustment) => {
		setScore((prevScore) => prevScore + adjustment);
		if (!attempted.includes(id)) setAttempted((prev) => [...prev, id]);
	};

	return (
		<>
			<Timer
				time={0.5}
				resetTimestamp={resetTimestamp}
				submitStatus={showResults}
			/>
			<button onClick={handleReset}>Reset</button>
			{!showResults && <button onClick={handleSubmit}>Submit</button>}
			{showResults && (
				<>
					<p>
						score={score} total={questions.length}
					</p>
					<p>
						attempted={attempted.length} total={questions.length}
					</p>
				</>
			)}

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
		</>
	);
};

export default page;
