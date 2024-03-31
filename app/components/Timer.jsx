import React, { useState, useRef, useEffect } from "react";
import Countdown, { zeroPad } from "react-countdown";

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
		calculateElapsedTime();
	};

	const calculateElapsedTime = () => {
		const now = Date.now();
		const elapsedTimeInSeconds = (now - startTimeRef.current) / 1000;
		setElapsed(elapsedTimeInSeconds);
	};

	const handleTimerReset = () => {
		console.log("handleTimerReset");
		const now = Date.now();
		startTimeRef.current = now;
		const newTargetDate = now + props.time * 1000 * 60;
		setTargetDate(newTargetDate);
		setTestActive(true);
		setElapsed(0);
		if (countdownRef.current) {
			countdownRef.current.getApi().start();
		}
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
	}, [props.resetTimestamp, props.time]);

	useEffect(() => {
		console.log("submitStatus", props.submitStatus);
		if (!props.submitStatus) {
			handleTimerReset();
		} else {
			setTestActive(false);
			handleTimerStop();
		}
	}, [props.submitStatus]);

	useEffect(() => {
		if (!testActive) handleTimerStop();
	}, [props.showResults]);
	return (
		<div>
			{console.log("test active ", testActive)}
			{testActive ? (
				<>
					active test
					<Countdown
						ref={countdownRef}
						date={targetDate}
						onComplete={handleTimerStop}
						renderer={renderer}
					/>
				</>
			) : (
				<>
					<h1>done </h1>
					<h2>Time taken: {formatElapsedTime(elapsed)}</h2>
				</>
			)}
		</div>
	);
}

export default Timer;
