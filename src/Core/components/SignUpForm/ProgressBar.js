import React from 'react';

export default function ProgressBar({ progress }) {
	return (
		<div className='prog-bar-center'>
			<div className='prog-bar'>
				<div
					className='prog-circle'
					style={{ border: progress >= 1 && '2px solid purple' }}>
					1
				</div>
				<div
					className='prog-line'
					style={{ border: progress >= 2 && '2px solid purple' }}></div>
				<div
					className='prog-circle'
					style={{ border: progress >= 2 && '2px solid purple' }}>
					2
				</div>
				<div
					className='prog-line'
					style={{ border: progress >= 3 && '2px solid purple' }}></div>
				<div
					className='prog-circle'
					style={{ border: progress >= 3 && '2px solid purple' }}>
					3
				</div>
			</div>
			<div className='prog-text'>
				<p>Basic Info</p>
				<p>Experience</p>
				<p>Success</p>
			</div>
		</div>
	);
}
