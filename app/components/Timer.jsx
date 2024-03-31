import React, { useState, useRef } from "react";
import Countdown from "react-countdown";

function Timer(props) {
	const [completed, setCompleted] = useState(false);
	const [elapsed, setElapsed] = useState(0);
	const startTimeRef = useRef(Date.now());
	const countdownRef = useRef();

	const handleCompletion = () => {
		setCompleted(true);
		calculateElapsedTime();
	};

	const handleTimerStop = () => {
		if (countdownRef.current) {
			countdownRef.current.pause(); // Assuming pause functionality exists or custom implementation
		}
		setCompleted(true);
		calculateElapsedTime();
	};

	const calculateElapsedTime = () => {
		// Assuming Date.now() at start gives the current time minus the start time
		const elapsedTimeInSeconds = (Date.now() - startTimeRef.current) / 1000;
		setElapsed(elapsedTimeInSeconds);
	};

	// Converts elapsed time in seconds to minutes and seconds format
	const formatElapsedTime = (elapsedTimeInSeconds) => {
		const minutes = Math.floor(elapsedTimeInSeconds / 60);
		const seconds = Math.floor(elapsedTimeInSeconds % 60);
		return `${minutes} min : ${seconds} sec`;
	};

	return (
		<div>
			{!completed ? (
				<>
					<Countdown
						ref={countdownRef}
						date={Date.now() + props.time * 1000 * 60}
						onComplete={handleCompletion}
					/>
					<button onClick={handleTimerStop}>Stop</button>
				</>
			) : (
				<>
					<h1>Time's up or Stopped!</h1>
					<h2>Time taken: {formatElapsedTime(elapsed)}</h2>
				</>
			)}
		</div>
	);
}

export default Timer;
