import { useTime } from './TimeContext';

function ToggleSounds() {
	const { allowSound, setAllowSound } = useTime();
	return (
		<button
			className="btn-sound"
			onClick={() => setAllowSound(allow => !allow)}
		>
			{allowSound ? '🔈' : '🔇'}
		</button>
	);
}

export default ToggleSounds;
