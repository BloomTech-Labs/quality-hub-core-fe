import React from 'react';

import './ProgressBar.scss';

export default function ProgressBar({ progress }) {
	return (
		<div className='prog-bar-center'>
			<div className='prog-bar'>
				<div
					className='prog-circle'
					style={{ border: progress >= 1 && '2px solid purple' }}>
					<p style={{ color: progress >= 1 && 'purple'}}>1</p>
				</div>
        <p style={{ color: progress >= 1 && 'purple'}}>Coach Profile</p>
				<div
					className='prog-line'
					style={{ border: progress >= 2 && '2px solid purple' }}>
        </div>
				<div
					className='prog-circle'
					style={{ border: progress >= 2 && '2px solid purple' }}>
					<p style={{ color: progress >= 2 && 'purple'}}>2</p>
				</div>
        <p style={{ color: progress >= 2 && 'purple'}}>Rate</p>
				<div
					className='prog-line'
          style={{ border: progress >= 3 && '2px solid purple' }}>  
        </div>
				<div
					className='prog-circle'
					style={{ border: progress >= 3 && '2px solid purple' }}>
					<p style={{ color: progress >= 3 && 'purple'}}>3</p>
				</div>
        <p style={{ color: progress >= 3 && 'purple'}}>Review Post</p>
        <div
					className='prog-line'
					style={{ border: progress >= 4 && '2px solid purple' }}>  
        </div>
				<div
					className='prog-circle'
					style={{ border: progress >= 4 && '2px solid purple' }}>
					<p style={{ color: progress >= 4 && 'purple'}}>4</p>
				</div>
        <p style={{ color: progress >= 4 && 'purple'}}>Done</p>
        {/* <div
					className='prog-line'
					style={{ border: progress >= 5 && '2px solid purple' }}>  
        </div>
				<div
					className='prog-circle'
					style={{ border: progress >= 5 && '2px solid purple' }}>
					<p style={{ color: progress >= 5 && 'purple'}}>5</p>
				</div>
        <p style={{ color: progress >= 5 && 'purple'}}>Done</p> */}
			</div>
		</div>
	);
}
