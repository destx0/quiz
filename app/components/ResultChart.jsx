import React from "react";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";

const ResultChart = (props) => {
	const right = props.right;
	const wrong = props.wrong;
	const unattempted = props.unattempted;
	const totalProblems = props.totalProblems;
	const showResults = props.showResults;

	const data = [
		{
			name: "Questions",
			right: right,
			wrong: wrong,
			attempted: right + wrong,
			unattempted: unattempted,
		},
	];

	return (
		<ResponsiveContainer width="100%" height={100}>
			{" "}
			<BarChart
				data={data}
				layout="vertical"
				margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
			>
				{" "}
				<CartesianGrid strokeDasharray="3 3" />{" "}
				<XAxis
					type="number"
					domain={[0, totalProblems]}
					stroke="#f0f0f0"
					tickFormatter={() => ""}
				/>{" "}
				<YAxis type="category" dataKey="name" stroke="#f0f0f0" />{" "}
				<Tooltip
					contentStyle={{ backgroundColor: "#171d27", color: "#fff" }}
				/>{" "}
				<Legend wrapperStyle={{ color: "#f0f0f0" }} />{" "}
				{showResults && (
					<Bar
						dataKey="right"
						stackId="a"
						fill="rgba(16, 185, 129, 1)"
						name={`Right (${data[0].right})`}
					/>
				)}{" "}
				{showResults && (
					<Bar
						dataKey="wrong"
						stackId="a"
						fill="rgba(239, 68, 68, 1)"
						name={`Wrong (${data[0].wrong})`}
					/>
				)}{" "}
				{!showResults && (
					<Bar
						dataKey="attempted"
						stackId="a"
						fill="hsl(221.2, 83.2%, 53.3%)"
						name={`Attempted (${data[0].attempted})`}
					/>
				)}{" "}
				<Bar
					dataKey="unattempted"
					stackId="a"
					fill="#ccd2e4f4"
					name={`Unattempted (${data[0].unattempted})`}
				/>{" "}
			</BarChart>{" "}
		</ResponsiveContainer>
	);
};

export default ResultChart;
