"use client";
import React, { useState } from "react";
import db from "@/services/firebase-config";
import { collection, addDoc } from "firebase/firestore";
import FancyText from "../components/FancyText";

const UploadButton = () => {
	const [question, setQuestion] = useState("");
	const [options, setOptions] = useState(["", "", "", ""]);
	const [correctAnswer, setCorrectAnswer] = useState("");
	const [tags, setTags] = useState("");
	const [explanation, setExplanation] = useState("");
	const [topic, setTopic] = useState("");
	const [subtopic, setSubtopic] = useState("");
	const [inputFormat, setInputFormat] = useState("individual");
	const [jsonInput, setJsonInput] = useState("");

	const handleInputChange = (e, index) => {
		const { name, value } = e.target;
		if (name === "options") {
			const updatedOptions = [...options];
			updatedOptions[index] = value;
			setOptions(updatedOptions);
		} else {
			switch (name) {
				case "question":
					setQuestion(value);
					break;
				case "correctAnswer":
					setCorrectAnswer(value);
					break;
				case "tags":
					setTags(value);
					break;
				case "explanation":
					setExplanation(value);
					break;
				case "topic":
					setTopic(value);
					break;
				case "subtopic":
					setSubtopic(value);
					break;
				case "jsonInput":
					setJsonInput(value);
					break;
				default:
					break;
			}
		}
	};

	const uploadData = async () => {
		try {
			const subtopicsCol = collection(db, "subtopics");
			const mappingCol = collection(db, "topicSubtopicMapping");

			if (inputFormat === "individual") {
				const questionData = {
					question,
					options,
					correctAnswer,
					tags: tags.split(",").map((tag) => tag.trim()),
					explanation,
				};

				// Upload subtopic data
				const subtopicDocRef = await addDoc(subtopicsCol, {
					name: subtopic,
					questions: [questionData],
				});

				// Create mapping between topic and subtopic
				await addDoc(mappingCol, {
					topic,
					subtopic: subtopicDocRef.id,
				});
			} else if (inputFormat === "json") {
				const questionsData = JSON.parse(jsonInput);

				// Upload subtopic data
				const subtopicDocRef = await addDoc(subtopicsCol, {
					name: subtopic,
					questions: questionsData,
				});

				// Create mapping between topic and subtopic
				await addDoc(mappingCol, {
					topic,
					subtopic: subtopicDocRef.id,
				});
			}

			alert("Data uploaded successfully!");
		} catch (error) {
			console.error("Error uploading data: ", error);
			alert("Error uploading data. Check the console for details.");
		}
	};

	const showPreviews = question.trim() !== "" || explanation.trim() !== "";

	return (
		<div>
			<div>
				<label>
					Input Format:
					<select
						value={inputFormat}
						onChange={(e) => setInputFormat(e.target.value)}
					>
						<option value="individual">Individual Input</option>
						<option value="json">JSON Input</option>
					</select>
				</label>
			</div>

			{inputFormat === "individual" ? (
				<div>
					<div>
						<label>
							Question:
							<textarea
								name="question"
								value={question}
								onChange={handleInputChange}
								placeholder="Enter question (Markdown supported)"
							/>
						</label>
					</div>

					<div>
						<label>Options:</label>
						{options.map((option, index) => (
							<div key={index}>
								<input
									type="text"
									name="options"
									value={option}
									onChange={(e) =>
										handleInputChange(e, index)
									}
									placeholder={`Enter option ${index + 1}`}
								/>
							</div>
						))}
					</div>

					<div>
						<label>
							Correct Answer:
							<input
								type="text"
								name="correctAnswer"
								value={correctAnswer}
								onChange={handleInputChange}
								placeholder="Enter correct answer index"
							/>
						</label>
					</div>

					<div>
						<label>
							Tags:
							<input
								type="text"
								name="tags"
								value={tags}
								onChange={handleInputChange}
								placeholder="Enter tags (comma-separated)"
							/>
						</label>
					</div>

					<div>
						<label>
							Explanation:
							<textarea
								name="explanation"
								value={explanation}
								onChange={handleInputChange}
								placeholder="Enter explanation (Markdown supported)"
							/>
						</label>
					</div>
				</div>
			) : (
				<div>
					<label>
						JSON Input:
						<textarea
							name="jsonInput"
							value={jsonInput}
							onChange={handleInputChange}
							placeholder="Enter questions in JSON format"
						/>
					</label>
				</div>
			)}

			<div>
				<label>
					Topic:
					<input
						type="text"
						name="topic"
						value={topic}
						onChange={handleInputChange}
						placeholder="Enter topic"
					/>
				</label>
			</div>

			<div>
				<label>
					Subtopic:
					<input
						type="text"
						name="subtopic"
						value={subtopic}
						onChange={handleInputChange}
						placeholder="Enter subtopic"
					/>
				</label>
			</div>

			<div>
				<button onClick={uploadData}>
					Upload Questions to Firebase
				</button>
			</div>

			{inputFormat === "individual" && showPreviews && (
				<div>
					<h3>Question Preview:</h3>
					<FancyText content={question} />
					<h3>Explanation Preview:</h3>
					<FancyText content={explanation} />
				</div>
			)}
		</div>
	);
};

export default UploadButton;
