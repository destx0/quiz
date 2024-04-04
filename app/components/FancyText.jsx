import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css"; // Import KaTeX CSS
import remarkMath from "remark-math";

const FancyText = (props) => (
	<ReactMarkdown
		children={props.content}
		remarkPlugins={[remarkMath]}
		rehypePlugins={[rehypeKatex]}
	/>
);

export default FancyText;
