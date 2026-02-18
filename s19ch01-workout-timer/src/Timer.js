import { useEffect } from 'react';
import { useTime } from './TimeContext';

function Timer() {
	const { time, setTime, formatTime } = useTime();
	useEffect(
		function () {
			const id = setInterval(function () {
				setTime(formatTime(new Date()));
			}, 1000);

			return () => clearInterval(id);
		},
		[formatTime, setTime],
	);

	return <time>For your workout on {time}</time>;
}

export default Timer;
