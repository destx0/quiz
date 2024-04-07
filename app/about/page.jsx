"use client";
import React from "react";
import QuillEditor from "../components/Editor";
import { GridBackgroundDemo } from "@/components/ui/gridBackground";

const page = () => {
	return (
		<>
			{" "}
			<GridBackgroundDemo />
			<QuillEditor />
			<p>about</p>
		</>
	);
};
export default page;
