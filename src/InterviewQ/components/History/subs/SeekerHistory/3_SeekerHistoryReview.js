import React from 'react';

import EditReview from './5_EditReview';

export default function SeekerHistoryReview({ booking }) {
	return (
		<div>
			<EditReview review={booking.review} />
			<div>Click here to update your review</div>
		</div>
	);
}
