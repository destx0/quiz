"use client";
import React from "react";
import Question from "../components/Question";
import { questionsData } from "../data";
import Submit from "../components/Submit";
import Timer from "../components/Timer";
const questions = questionsData;
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import ResultChart from "../components/ResultChart";

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
			<div className="sticky top-0 z-40 bg-blue/30 backdrop-blur-sm bg-slate-950/80  rounded-md flex items-center gap-4 p-4">
				<Timer
					time={0.5}
					resetTimestamp={resetTimestamp}
					submitStatus={showResults}
				/>
				<ResultChart
					right={score}
					wrong={attempted.length - score}
					unattempted={questions.length - attempted.length}
					totalProblems={questions.length}
					showResults={showResults}
				/>
				{showResults ? (
					<Button onClick={handleReset} className="px-6 py-3 m-4">
						Reset
					</Button>
				) : (
					<Button onClick={handleSubmit} className="px-6 py-3 m-4">
						Submit
					</Button>
				)}
			</div>
			<div className="flex flex-col items-center w-full max-w-2xl mx-auto">
				{questions.map((item, index) => (
					<div key={index} className="relative w-full p-4 mb-4 ">
						<Question
							qId={index}
							question={item.question}
							options={item.options}
							correctAnswer={item.correctAnswer}
							showResults={showResults}
							increaseAttempted={increaseAttempted}
							resetTimestamp={resetTimestamp}
							explanation={item.explanation}
						/>
					</div>
				))}
			</div>
		</>
	);
};

export default page;
