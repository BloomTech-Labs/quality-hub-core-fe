import React, { useState } from 'react';

import HistoryReview from '../HistoryReview';
import CoachResponse from '../CoachResponse/CoachResponse';

export default function CoachHistoryReview({ booking }) {
	const [showResponse, setShowResponse] = useState(false);

	return (
		<div className='coach-history-review'>
			{booking.review ? (
				<>
					<HistoryReview booking={booking} />
					<button
						className='toggle-coach-response-btn'
						onClick={() => setShowResponse(!showResponse)}>
						Reply to this review
					</button>
					{showResponse && <CoachResponse />}
				</>
			) : (
				<p>{booking.seeker.first_name} has not yet submitted a review.</p>
			)}
		</div>
	);
}
