import React from 'react';

import HistoryReview from '../HistoryReview';

export default function CoachHistoryReview({ booking }) {
	return (
		<div className='coach-history-review'>
			{booking.review ? (
				<HistoryReview booking={booking} />
			) : (
				<p>{booking.seeker.first_name} has not yet submitted a review.</p>
			)}
		</div>
	);
}
