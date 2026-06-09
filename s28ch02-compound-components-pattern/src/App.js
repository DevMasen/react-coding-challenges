import Counter from './Counter';
import './styles.css';

export default function App() {
	return (
		<div>
			<h1>Compound Component Pattern</h1>
			<Counter
				iconIncrease="+"
				iconDecrease="-"
				label="My NOT so flexible counter"
				hideLabel={false}
				hideIncrease={false}
				hideDecrease={false}
			/>

			<Counter>
				<div>
					<Counter.Label> My super flexible Component </Counter.Label>
				</div>
				<Counter.Decrease icon="-" />
				<Counter.Count />
				<Counter.Increase icon="+" />
			</Counter>

			<Counter>
				<div>
					<Counter.Decrease icon="-" />
					<Counter.Label>
						I fucked your Mommy <Counter.Count /> times{' '}
					</Counter.Label>
					<Counter.Increase icon="+" />
				</div>
			</Counter>
		</div>
	);
}
