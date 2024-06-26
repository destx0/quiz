import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function QuillEditor() {
	const [value, setValue] = useState("");
	const onChange = (value) => {
		setValue(value);
	};

	return (
		<>
			<ReactQuill theme="snow" value={value} onChange={onChange} />
			<div>{value}</div>
		</>
	);
}

export default QuillEditor;
