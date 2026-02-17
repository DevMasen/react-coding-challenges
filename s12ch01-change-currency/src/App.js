import { useEffect, useState } from 'react';
import './App.css';

function App() {
	const [originCurrency, setOriginCurrency] = useState('USD');
	const [distCurrency, setDistCurrency] = useState('USD');
	const [inputValue, setInputValue] = useState('');
	const [result, setResult] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	useEffect(
		function () {
			setResult('');
			async function getConversion() {
				try {
					setIsLoading(true);
					const res = await fetch(
						`https://api.frankfurter.app/latest?amount=${inputValue}&from=${originCurrency}&to=${distCurrency}`,
					);
					if (!res.ok)
						throw new Error(
							`Something Went Wrong! code:${res.status}`,
						);
					const data = await res.json();
					setResult(data.rates[distCurrency]);
				} catch (err) {
					if (err.name !== 'AbortError') setResult(err.message);
				} finally {
					setIsLoading(false);
				}
			}
			if (originCurrency === distCurrency) {
				setResult(inputValue);
				return;
			}
			if (!inputValue) {
				return;
			}

			getConversion();
		},
		[originCurrency, distCurrency, inputValue],
	);

	return (
		<div>
			<input
				type="text"
				value={inputValue}
				onChange={e => setInputValue(e.target.value)}
				disabled={isLoading}
			/>
			<select
				value={originCurrency}
				onChange={e => setOriginCurrency(e.target.value)}
				disabled={isLoading}
			>
				<option value="USD">USD</option>
				<option value="EUR">EUR</option>
				<option value="CAD">CAD</option>
				<option value="INR">INR</option>
			</select>
			<select
				value={distCurrency}
				onChange={e => setDistCurrency(e.target.value)}
				disabled={isLoading}
			>
				<option value="USD">USD</option>
				<option value="EUR">EUR</option>
				<option value="CAD">CAD</option>
				<option value="INR">INR</option>
			</select>
			<p>
				{result} {inputValue && distCurrency}
			</p>
		</div>
	);
}

export default App;
