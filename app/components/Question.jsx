"use client";
import React, { useState, useEffect } from "react";
import Fancytext from "./Fancytext";

const Question = ({
	qId,
	question,
	options,
	correctAnswer,
	showResults,
	increaseAttempted,
	resetTimestamp,
	explanation,
}) => {
	const [selected, setSelected] = React.useState(null);

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
		setSelected(null);
	}, [resetTimestamp]);

	return (
		<div>
			<p>Question {qId + 1}</p>
			<Fancytext content={question} />

			{showResults &&
				(correctAnswer !== selected ? (
					<p>Correct Answer: {options[correctAnswer]}</p>
				) : (
					<p>Correct!</p>
				))}
			{options.map((option, index) => (
				<div key={index}>
					<button
						key={index}
						onClick={() => handleOptionClick(index, qId)}
						style={{
							backgroundColor:
								showResults && index === correctAnswer
									? "#4CAF50"
									: showResults &&
									  index === selected &&
									  selected !== correctAnswer
									? "#FF5733"
									: index === selected
									? "#4CAF50"
									: "#f0f0f0",
							color:
								index === selected ||
								(showResults && index === correctAnswer)
									? "white"
									: "black",
						}}
					>
						{option}
					</button>
				</div>
			))}
			{showResults && (
				<>
					{correctAnswer !== selected ? (
						<p>Correct Answer: {options[correctAnswer]}</p>
					) : (
						<p>Correct!</p>
					)}
					<Fancytext content={explanation} />
				</>
			)}
		</div>
	);
};

export default Question;
