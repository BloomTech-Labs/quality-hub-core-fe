import React from 'react';

export default function SeekerHistoryRow({ booking }) {
	console.log(booking);
	return (
		<div className='seeker-history-row'>
			<div>
				{booking.coach.first_name} {booking.coach.last_name}
			</div>
			<div>
				{booking.month}/{booking.day}/{booking.year}
			</div>
			<div>
				{booking.hour}:{booking.minute}
				{booking.minute === 0 && '0'}
			</div>
			<div>View your Report</div>
		</div>
	);
}
