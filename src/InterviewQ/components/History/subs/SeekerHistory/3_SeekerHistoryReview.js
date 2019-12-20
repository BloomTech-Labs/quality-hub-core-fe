import React from 'react';

import EditReview from './5_EditReviewForm';

export default function SeekerHistoryReview({ booking }) {
	return (
		<div>
			<EditReview review={booking.review} />
		</div>
	);
}
