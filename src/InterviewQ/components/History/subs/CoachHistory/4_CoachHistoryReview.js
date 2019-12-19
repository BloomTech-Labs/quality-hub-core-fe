import React from 'react';

import HistoryReview from '../HistoryReview';
import CoachResponse from './5_CoachResponse';

export default function CoachHistoryReview({ booking }) {
	return (
		<div className='coach-history-review'>
			{booking.review ? (
				<div>
					<HistoryReview booking={booking} />
					<CoachResponse />
				</div>
			) : (
				<p>{booking.seeker.first_name} has not yet submitted a review.</p>
			)}
		</div>
	);
}
