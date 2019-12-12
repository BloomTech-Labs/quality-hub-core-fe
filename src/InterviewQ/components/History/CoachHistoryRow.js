import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
				<div>
					<Link
						to={{
							pathname: `/interviewq/coachreport/${booking.uniquecheck}`,
							state: { firstName: booking.seeker.first_name },
						}}>
						{booking.report ? 'View' : 'Write'} your Report
					</Link>
				</div>
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
