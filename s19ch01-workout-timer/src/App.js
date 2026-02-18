import Calculator from './Calculator';
import ToggleSounds from './ToggleSounds';
import Timer from './Timer';
import { TimeProvider } from './TimeContext';

function App() {
	return (
		<TimeProvider>
			<main>
				<h1>Workout timer</h1>
				<Timer />
				<ToggleSounds />
				<Calculator />
			</main>
		</TimeProvider>
	);
}

export default App;
