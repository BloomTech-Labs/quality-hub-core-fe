import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
				<div>
					<Link
						to={{
							pathname: `/interviewq/test/${booking.uniquecheck}`,
							state: { firstName: booking.coach.first_name },
						}}>
						{booking.review ? 'View' : 'Write'} your Review
					</Link>
				</div>
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
