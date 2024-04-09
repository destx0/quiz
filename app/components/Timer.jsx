import React, { useState, useRef, useEffect } from "react";
import Countdown, { zeroPad } from "react-countdown";

const handleTimerReset = (
	startTimeRef,
	setTargetDate,
	props,
	setTestActive,
	countdownRef
) => {
	console.log("handleTimerReset");
	const now = Date.now();
	startTimeRef.current = now;
	const newTargetDate = now + props.time * 1000 * 60;
	setTargetDate(newTargetDate);
	setTestActive(true);
	if (countdownRef.current) {
		countdownRef.current.getApi().start();
	}
};

function Timer(props) {
	const [testActive, setTestActive] = useState(true);
	const [elapsed, setElapsed] = useState(0);
	const startTimeRef = useRef(Date.now());
	const [targetDate, setTargetDate] = useState(
		Date.now() + props.time * 1000 * 60
	);
	const countdownRef = useRef();

	const handleTimerStop = () => {
		if (countdownRef.current) {
			countdownRef.current.pause();
		}
		setTestActive(false);
		console.log("timer stopped= ", testActive);
	};

	const renderer = ({ hours, minutes, seconds }) => (
		<span>
			{zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
		</span>
	);

	const formatElapsedTime = (elapsedTimeInSeconds) => {
		const minutes = Math.floor(elapsedTimeInSeconds / 60);
		const seconds = Math.floor(elapsedTimeInSeconds % 60);
		return `${minutes} min : ${seconds} sec`;
	};

	useEffect(() => {
		console.log("resetTimestamp");
		handleTimerReset(
			startTimeRef,
			setTargetDate,
			props,
			setTestActive,
			countdownRef
		);
	}, [props.resetTimestamp, props.time]);

	useEffect(() => {
		console.log("submitStatus", props.submitStatus);
		if (!props.submitStatus) {
			handleTimerReset(
				startTimeRef,
				setTargetDate,
				props,
				setTestActive,
				countdownRef
			);
		} else {
			handleTimerStop();
		}
	}, [props.submitStatus]);

	useEffect(() => {
		if (props.showResults) {
			handleTimerStop();
		}
	}, [props.showResults]);

	useEffect(() => {
		return () => {
			const elapsedTimeInSeconds =
				(Date.now() - startTimeRef.current) / 1000;
			setElapsed(elapsedTimeInSeconds);
		};
	}, []);

	return (
		<div>
			{testActive ? (
				<>
					<Countdown
						ref={countdownRef}
						date={targetDate}
						onComplete={handleTimerStop}
						renderer={renderer}
						className="text-grey-200"
					/>
				</>
			) : (
				<>
					<p className="text-gray-200">
						Time taken: {formatElapsedTime(elapsed)}
					</p>
				</>
			)}
		</div>
	);
}

export default Timer;
