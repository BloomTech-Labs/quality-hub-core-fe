import React from 'react';
import PropTypes from 'prop-types';

export default function Icon(props) {
	console.log(props);

	const styles = {
		svg: {
			display: 'inline-block',
			verticalAlign: 'middle',
		},
		path: {
			fill: props.color,
		},
	};

	return (
		<svg
			width={`${props.width}`}
			height={`${props.height}`}
			viewBox={`0 0 ${props.width} ${props.height}`}>
			<path style={styles.path} d={props.icon} />
		</svg>
	);
}

Icon.propTypes = {
	icon: PropTypes.string.isRequired,
	width: PropTypes.number,
	height: PropTypes.number,
	color: PropTypes.string,
};

Icon.defaultProps = {
	color: 'black',
};
