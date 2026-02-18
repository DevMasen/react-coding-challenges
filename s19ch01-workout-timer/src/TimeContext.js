import { createContext, useContext, useState } from 'react';

const TimeContext = createContext();

function formatTime(date) {
	return new Intl.DateTimeFormat('en', {
		month: 'short',
		year: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
	}).format(date);
}

function TimeProvider({ children }) {
	const [time, setTime] = useState(formatTime(new Date()));
	const [allowSound, setAllowSound] = useState(true);
	const partOfDay = time.slice(-2);
	const workouts = [
		{
			name: 'Full-body workout',
			numExercises: partOfDay === 'AM' ? 9 : 8,
		},
		{
			name: 'Arms + Legs',
			numExercises: 6,
		},
		{
			name: 'Arms only',
			numExercises: 3,
		},
		{
			name: 'Legs only',
			numExercises: 4,
		},
		{
			name: 'Core only',
			numExercises: partOfDay === 'AM' ? 5 : 4,
		},
	];

	return (
		<TimeContext.Provider
			value={{
				time,
				partOfDay,
				workouts,
				allowSound,
				setTime,
				formatTime,
				setAllowSound,
			}}
		>
			{children}
		</TimeContext.Provider>
	);
}

function useTime() {
	const context = useContext(TimeContext);
	if (context === undefined)
		throw new Error('TimeContext used outside of TimeProvider!');
	return context;
}

export { TimeProvider, useTime };
