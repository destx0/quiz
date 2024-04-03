"use client";
import React from "react";
import db from "@/services/firebase-config";
import { collection, addDoc } from "firebase/firestore";

// Your questionsData array
const questionsData = [
	{
		id: 52,
		question: "Who painted the Mona Lisa?",
		options: [
			"Vincent van Gogh",
			"Pablo Picasso",
			"Leonardo da Vinci",
			"Michelangelo",
		],
		correctAnswer: 2,
		tags: ["Art", "Renaissance"],
		explanation:
			"The Mona Lisa, a portrait painted by Leonardo da Vinci, is one of the most renowned artworks in the world. Da Vinci, an Italian polymath of the Renaissance period, is celebrated for his advancements in art, science, engineering, anatomy, and innovation.",
	},
	{
		id: 53,
		question: "What is the largest planet in our solar system?",
		options: ["Saturn", "Jupiter", "Mars", "Earth"],
		correctAnswer: 1,
		tags: ["Science", "Astronomy"],
		explanation:
			"Jupiter is recognized as the largest planet in our solar system. It's a gas giant, notable for its size, massive storms such as the Great Red Spot, and its numerous moons. Jupiter's mass is over twice that of all the other planets combined.",
	},
	{
		id: 54,
		question: "What is the chemical symbol for gold?",
		options: ["Ag", "Cu", "Au", "Fe"],
		correctAnswer: 2,
		tags: ["Science", "Chemistry"],
		explanation:
			"Au is the chemical symbol for gold, from the Latin 'aurum' which means 'shining dawn'. Gold is a chemical element with the atomic number 79. It is a highly sought-after precious metal, used in jewelry, electronics, and for monetary purposes.",
	},
	{
		id: 50,
		question: "What is the process of cell division in bacteria called?",
		options: ["Mitosis", "Binary Fission", "Meiosis", "Fragmentation"],
		correctAnswer: 1,
		tags: ["Science", "Biology"],
		explanation:
			"Binary Fission is the process through which bacteria reproduce. Unlike more complex organisms that use mitosis or meiosis, bacteria simply split into two identical cells, ensuring rapid population growth.",
	},
];

const UploadButton = () => {
	// Function to upload data to Firestore
	const uploadData = async () => {
		try {
			const questionsCol = collection(db, "questions"); // "questions" is the collection name

			// Using Promise.all to wait for all the add operations to complete
			await Promise.all(
				questionsData.map((question) => {
					return addDoc(questionsCol, {
						id: question.id,
						question: question.question,
						options: question.options,
						correctAnswer: question.correctAnswer,
						tags: question.tags,
						explanation: question.explanation,
					});
				})
			);

			alert("Data uploaded successfully!");
		} catch (error) {
			console.error("Error uploading data: ", error);
			alert("Error uploading data. Check the console for details.");
		}
	};

	return <button onClick={uploadData}>Upload Questions to Firebase</button>;
};

export default UploadButton;
