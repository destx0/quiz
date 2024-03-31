import React, { useState, useRef, useEffect } from "react";
import Countdown, { zeroPad } from "react-countdown";

function Timer(props) {
	const [completed, setCompleted] = useState(false);
	const [elapsed, setElapsed] = useState(0);
	// Use useEffect to update startTimeRef and targetDate when props.resetTimestamp changes
	const startTimeRef = useRef(Date.now());
	const [targetDate, setTargetDate] = useState(
		Date.now() + props.time * 1000 * 60
	);
	const countdownRef = useRef();

	const handleCompletion = () => {
		setCompleted(true);
		calculateElapsedTime();
	};

	const handleTimerStop = () => {
		if (countdownRef.current) {
			countdownRef.current.pause();
		}
		setCompleted(true);
		calculateElapsedTime();
	};

	const calculateElapsedTime = () => {
		const now = Date.now();
		const elapsedTimeInSeconds = (now - startTimeRef.current) / 1000;
		setElapsed(elapsedTimeInSeconds);
	};

	const handleTimerReset = () => {
		const now = Date.now();
		startTimeRef.current = now;
		const newTargetDate = now + props.time * 1000 * 60;
		setTargetDate(newTargetDate);
		setCompleted(false);
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
		// Automatically reset the timer when props.resetTimestamp changes
		handleTimerReset();
	}, [props.resetTimestamp, props.time]);

	useEffect(() => {
		if (!completed) {
			countdownRef.current.getApi().start();
		}
	}, [targetDate, completed]);

	useEffect(() => {
		handleTimerStop();
	}, [props.submitStatus]);

	return (
		<div>
			{!completed ? (
				<>
					<Countdown
						ref={countdownRef}
						date={targetDate}
						onComplete={handleTimerStop}
						renderer={renderer}
					/>
					<button onClick={handleTimerStop}>Stop</button>
				</>
			) : (
				<>
					<h1>done</h1>
					<h2>Time taken: {formatElapsedTime(elapsed)}</h2>
				</>
			)}
		</div>
	);
}

export default Timer;
