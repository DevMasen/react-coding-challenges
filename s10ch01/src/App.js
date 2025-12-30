import { useState } from 'react';
import './styles.css';

export default function App() {
	return (
		<div className="app">
			<TextExpander size={20}>
				Space travel is the ultimate adventure! Imagine soaring past the
				stars and exploring new worlds. It's the stuff of dreams and
				science fiction, but believe it or not, space travel is a real
				thing. Humans and robots are constantly venturing out into the
				cosmos to uncover its secrets and push the boundaries of what's
				possible.
			</TextExpander>

			<TextExpander
				collapsedNumWords={20}
				expandButtonText="Show text"
				collapseButtonText="Collapse text"
				buttonColor="#ff6622"
			>
				Space travel requires some seriously amazing technology and
				collaboration between countries, private companies, and
				international space organizations. And while it's not always
				easy (or cheap), the results are out of this world. Think about
				the first time humans stepped foot on the moon or when rovers
				were sent to roam around on Mars.
			</TextExpander>

			<TextExpander expandedDefault={true} className="box">
				Space missions have given us incredible insights into our
				universe and have inspired future generations to keep reaching
				for the stars. Space travel is a pretty cool thing to think
				about. Who knows what we'll discover next!
			</TextExpander>
			<TextExpander></TextExpander>
		</div>
	);
}

function TextExpander({
	children = '',
	collapsedNumWords = 10,
	collapseButtonText = 'Show less',
	expandButtonText = 'Show more',
	buttonColor = '#3412f6ff',
	expandedDefault = false,
	size = 16,
	className = '',
}) {
	const [expanded, setExpanded] = useState(expandedDefault);
	const words = children.split(' ');
	const visibleText = words.slice(0, collapsedNumWords).join(' ');
	const shownText = expanded ? children : visibleText;

	const handleExpand = () => {
		setExpanded(curExpanded => !curExpanded);
	};
	return (
		<div className={className} style={{ fontSize: `${size}px` }}>
			{shownText}

			{children.length > 0 ? (
				!expanded ? (
					<>
						{'... '}
						<Button
							size={size}
							className="button"
							onExpand={handleExpand}
							buttonColor={buttonColor}
						>
							{expandButtonText}
						</Button>
					</>
				) : (
					<>
						{' '}
						<Button
							size={size}
							className="button"
							onExpand={handleExpand}
							buttonColor={buttonColor}
						>
							{collapseButtonText}
						</Button>
					</>
				)
			) : (
				'<Empty>'
			)}
		</div>
	);
}

function Button({
	size = 16,
	children = '',
	buttonColor = '',
	className = '',
	onExpand = function () {},
}) {
	const buttonStyle = {
		color: buttonColor,
		fontSize: `${size * (85 / 100)}px`,
	};
	return (
		<button style={buttonStyle} className={className} onClick={onExpand}>
			{children}
		</button>
	);
}
