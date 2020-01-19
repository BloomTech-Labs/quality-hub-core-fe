import React from 'react';
import loadingGIF from './loading2.gif';

const Loading = props => {
	return (
		<div>
			{/* Copied loader off of random site. Would be cool to have our own custom one?! */}
			<img
				src={loadingGIF}
				height='100px'
				width='100px'
				alt='loading animation'
			/>
		</div>
	);
};

export default Loading;
