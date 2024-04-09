"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { collection, addDoc } from "firebase/firestore";
import db from "@/services/firebase-config";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

const questionSchema = z.object({
	question: z.string().min(1, "Question is required"),
	options: z
		.array(z.string().min(1, "Option is required"))
		.min(2, "At least 2 options are required"),
	correctAnswerIndex: z
		.number()
		.min(0, "Correct answer index must be a non-negative integer"),
	explanation: z.string().optional(),
	tags: z.array(z.string()).optional(),
});

const testFormSchema = z.object({
	testName: z.string().min(1, "Test name is required"),
	testType: z.enum(["topicwise", "subjectwise", "full", "mix"]),
	totalTime: z.coerce.number().min(1, "Total time must be greater than 0"),
	questions: z.string().min(1, "Questions are required"),
});
const TestForm = () => {
	const form = useForm({
		resolver: zodResolver(testFormSchema),
	});

	const [isUploading, setIsUploading] = useState(false);
	const [isUploadSuccess, setIsUploadSuccess] = useState(false);

	const onSubmit = async (data) => {
		try {
			setIsUploading(true);

			// Parse the questions JSON string into an array
			const parsedQuestions = JSON.parse(data.questions);

			// Validate the parsed questions against the questionSchema
			const validatedQuestions = z
				.array(questionSchema)
				.parse(parsedQuestions);

			// Upload the test data to Firebase Firestore
			const testData = {
				testName: data.testName,
				testType: data.testType,
				totalTime: data.totalTime,
				questions: validatedQuestions,
			};

			const docRef = await addDoc(
				collection(db, data.testType),
				testData
			);
			console.log("Test uploaded successfully. Document ID:", docRef.id);

			setIsUploading(false);
			setIsUploadSuccess(true);
		} catch (error) {
			console.error("Error uploading test:", error);
			setIsUploading(false);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="testName"
					render={({ field }) => (
						<FormItem className="m-8">
							<FormLabel>Name of Test</FormLabel>
							<FormControl>
								<Input
									placeholder="Enter test name"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="testType"
					render={({ field }) => (
						<FormItem className="m-8">
							<FormLabel>Test Type</FormLabel>
							<Select
								onValueChange={field.onChange}
								defaultValue={field.value}
							>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Select test type" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value="topicwise">
										Topicwise
									</SelectItem>
									<SelectItem value="subjectwise">
										Subjectwise
									</SelectItem>
									<SelectItem value="full">Full</SelectItem>
									<SelectItem value="mix">Mix</SelectItem>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="totalTime"
					render={({ field }) => (
						<FormItem className="m-8">
							<FormLabel>Total Time (in minutes)</FormLabel>
							<FormControl>
								<Input
									type="number"
									placeholder="Enter total time"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="questions"
					render={({ field }) => (
						<FormItem className="m-8">
							<FormLabel>Questions (JSON format)</FormLabel>
							<FormControl>
								<Textarea
									placeholder="Enter questions in JSON format"
									className="font-mono"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" className="m-8">
					Submit
				</Button>
			</form>
			{isUploading && <Progress value={50} className="w-full h-2 mt-4" />}
			<Dialog open={isUploadSuccess} onOpenChange={setIsUploadSuccess}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Upload Successful</DialogTitle>
						<DialogDescription>
							The test data has been uploaded successfully.
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<Button onClick={() => setIsUploadSuccess(false)}>
							OK
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</Form>
	);
};

export default TestForm;
