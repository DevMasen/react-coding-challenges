import { useEffect, useState } from 'react';
import './App.css';

function App() {
	const [originCurrency, setOriginCurrency] = useState('USD');
	const [distCurrency, setDistCurrency] = useState('USD');
	const [inputValue, setInputValue] = useState('');
	const [result, setResult] = useState('');

	useEffect(
		function () {
			const controller = new AbortController();
			setResult('');
			async function getConversion() {
				try {
					const res = await fetch(
						`https://api.frankfurter.app/latest?amount=${inputValue}&from=${originCurrency}&to=${distCurrency}`,
						{ signal: controller.signal },
					);
					if (!res.ok)
						throw new Error(
							`Something Went Wrong! code:${res.status}`,
						);
					const data = await res.json();
					setResult(data.rates[`${distCurrency}`]);
				} catch (err) {
					setResult(err.message);
				}
			}
			if (
				originCurrency === distCurrency ||
				!inputValue ||
				isNaN(inputValue)
			)
				return;
			getConversion();

			return function () {
				controller.abort();
			};
		},
		[originCurrency, distCurrency, inputValue],
	);

	return (
		<div>
			<input
				type="text"
				value={inputValue}
				onChange={e => setInputValue(e.target.value)}
			/>
			<select
				value={originCurrency}
				onChange={e => setOriginCurrency(e.target.value)}
			>
				<option value="USD">USD</option>
				<option value="EUR">EUR</option>
				<option value="CAD">CAD</option>
				<option value="INR">INR</option>
			</select>
			<select
				value={distCurrency}
				onChange={e => setDistCurrency(e.target.value)}
			>
				<option value="USD">USD</option>
				<option value="EUR">EUR</option>
				<option value="CAD">CAD</option>
				<option value="INR">INR</option>
			</select>
			<p>{result}</p>
		</div>
	);
}

export default App;
