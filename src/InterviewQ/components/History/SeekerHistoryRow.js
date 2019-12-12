import React, { useState } from 'react';

import SeekerBookingContent from './SeekerBookingContent';

export default function SeekerHistoryRow({ booking }) {
	const [showContent, setShowContent] = useState(false);

	return (
		<div>
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
				<div>Write/view your Review</div>
				<div
					className='history-content-toggle'
					onClick={() => setShowContent(!showContent)}>
					{showContent ? 'Hide' : 'View'} your Report
				</div>
			</div>
			{showContent && <SeekerBookingContent booking={booking} />}
		</div>
	);
}
