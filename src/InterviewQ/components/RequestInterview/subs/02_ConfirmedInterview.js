import React from 'react';
import { Link } from 'react-router-dom';
//import { confirmed } from '../../../../global/images/confirmed'

const ConfirmedInterview = ({ node }) => {
	return (
		<div ref={node}>
			<img src='/images/confirmed.svg' />
			<h2>You scheduled an interview!</h2>
			<div className='int-confirmation-text'>
			<p>
				Interviews can be canceled until 24 hours prior to start time with no
				penalty
			</p>
			<p>
				Also note, you will not be charged if the coach is unable to make the
				meeting
			</p>
			<Link to='/dashboard/schedule'>
			<button>See Schedule</button>
			</Link>
		</div>
		</div>
	);
};

export default ConfirmedInterview;