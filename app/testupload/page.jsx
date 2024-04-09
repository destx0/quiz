"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
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

const TestForm = () => {
	const form = useForm();

	const onSubmit = (data) => {
		// Handle form submission
		console.log(data);
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
									<SelectItem value="fullmix">
										Full Mix
									</SelectItem>
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
		</Form>
	);
};

export default TestForm;
