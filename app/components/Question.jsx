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

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

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

		increaseAttempted(qId, adjustment);
	};

	useEffect(() => {
		setSelected(null);
	}, [resetTimestamp]);

	return (
		<Card className="max-w-2xl mx-auto m-4 p-8 ">
			<CardTitle>Question {qId + 1}</CardTitle>
			<CardDescription className="my-4  overflow-x-auto">
				<Fancytext content={question} />
			</CardDescription>
			<RadioGroup>
				{options.map((option, index) => (
					<div key={index}>
						<Button
							key={index}
							onClick={() => handleOptionClick(index, qId)}
							className={`px-4 py-2 w-full justify-start 
							${
								index === selected
									? showResults
										? index === correctAnswer
											? "bg-green-500 text-white"
											: "bg-red-500 text-white"
										: ""
									: showResults
									? index === correctAnswer
										? "bg-green-500 text-white"
										: "bg-gray-200 text-black"
									: "bg-gray-200 text-black"
							}`}
						>
							{option}
						</Button>
					</div>
				))}{" "}
			</RadioGroup>
			{showResults && (
				<>
					<Accordion type="single" collapsible>
						<AccordionItem value="item-1">
							<AccordionTrigger>
								Correct Answer: {options[correctAnswer]}
							</AccordionTrigger>
							<AccordionContent>{explanation}</AccordionContent>
						</AccordionItem>
					</Accordion>
				</>
			)}
		</Card>
	);
};

export default Question;
