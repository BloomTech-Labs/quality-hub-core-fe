import React, { useState } from 'react';

import CoachBookingContent from './CoachBookingContent';

export default function CoachHistoryRow({ booking }) {
	const [showContent, setShowContent] = useState(false);

	return (
		<div>
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
				<div>Write/view your Report</div>
				<div
					className='history-content-toggle'
					onClick={() => setShowContent(!showContent)}>
					{showContent ? 'Hide' : 'View'} the seeker review
				</div>
			</div>
			{showContent && <CoachBookingContent booking={booking} />}
		</div>
	);
}
