import React from 'react';
import { Link } from 'react-router-dom';
import { greencheckcircle } from '../../../global/icons/checkcircle'

const ConfirmedInterview = () => {
	return (
    <>
		<div className='booking-content-section interviewq-confirmed-interview'>
			<span>{greencheckcircle()}</span>
			<h2>You requested an interview!</h2>
			<p>
				Interviews can be canceled until 24 hours prior to start time with no
				penalty
			</p>
			<p>
				Also note, you will not be charged if the coach is unable to make the
				meeting
			</p>
			<Link to='/dashboard/schedule'>Go to your schedule</Link>
		</div>
    </>
	);
};

export default ConfirmedInterview;