import React from 'react';

export default function CoachHistoryRow({ booking }) {
	return (
		<div className='coach-history-row'>
			<div>
				{booking.seeker.first_name} {booking.seeker.last_name}
			</div>
			<div>
				{booking.month}/{booking.day}/{booking.year}
			</div>
			<div>
				{booking.hour}:{booking.minute}
				{booking.minute === 0 && '0'}
			</div>
			<div>View the seeker review</div>
			<div>Make/edit your response</div>
		</div>
	);
}
