"use client";
import React, { useState, useEffect } from "react";
import Fancytext from "./FancyText";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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
		<Card className="m-4 p-8">
			<CardTitle>Question {qId + 1}</CardTitle>
			<Fancytext content={question} />

			<RadioGroup>
				{" "}
				{options.map((option, index) => (
					<div key={index}>
						{" "}
						<Button
							key={index}
							onClick={() => handleOptionClick(index, qId)}
							className={`
    ${showResults && index === correctAnswer ? "bg-green-500 text-white" : ""}
    ${
		showResults && index === selected && selected !== correctAnswer
			? "bg-red-500 text-white"
			: ""
	}
    ${index === selected ? "bg-green-500 text-white" : "bg-gray-100 text-black"}
    px-4 py-2 rounded
  `}
						>
							{option}
						</Button>{" "}
					</div>
				))}{" "}
			</RadioGroup>
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
		</Card>
	);
};

export default Question;
