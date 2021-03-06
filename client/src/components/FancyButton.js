import React from 'react';
import './FancyButton.css';
function FancyButton(props) {
	return (
		<button className={props.class} type="button" onClick={props.onClick}>
			{props.name}
		</button>
	);
}

export default FancyButton;
