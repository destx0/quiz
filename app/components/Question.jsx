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
							// If results are shown, and this is the correct answer, always green
							backgroundColor:
								showResults && index === correctAnswer
									? "#4CAF50"
									: // If this is the selected option and it's wrong, show red
									showResults &&
									  index === selected &&
									  selected !== correctAnswer
									? "#FF5733"
									: // If this is the selected option and it's correct or not showing results, show green
									index === selected
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
		</div>
	);
};

export default Question;
