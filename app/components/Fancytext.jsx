import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css"; // Import KaTeX CSS
import remarkMath from "remark-math";

const content = `
# This is a header

Here's some text with a formula:

$$
E = mc^2
$$

And here is an image:

![alt text](image-url.jpg)
`;

const MarkdownComponent = (props) => (
	<ReactMarkdown
		children={props.content}
		remarkPlugins={[remarkMath]}
		rehypePlugins={[rehypeKatex]}
	/>
	
);

export default MarkdownComponent;
