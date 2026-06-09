import { createContext, useContext, useState } from 'react';

const CounterContext = createContext();

function Counter({ children }) {
	const [count, setCount] = useState(0);
	const decrease = () => setCount(count => count - 1);
	const increase = () => setCount(count => count + 1);

	return (
		<CounterContext.Provider value={{ count, decrease, increase }}>
			{children}
		</CounterContext.Provider>
	);
}

function Label({ children }) {
	return <span>{children}</span>;
}

function Decrease({ icon }) {
	const { decrease } = useContext(CounterContext);
	return <button onClick={decrease}> {icon}</button>;
}

function Increase({ icon }) {
	const { increase } = useContext(CounterContext);
	return <button onClick={increase}> {icon}</button>;
}

function Count() {
	const { count } = useContext(CounterContext);
	return <span>{count}</span>;
}

Counter.Label = Label;
Counter.Count = Count;
Counter.Decrease = Decrease;
Counter.Increase = Increase;

export default Counter;
