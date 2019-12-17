import React from 'react';

import HistoryReview from '../HistoryReview';

export default function SeekerHistoryReview({ booking }) {
	return (
		<div>
			<HistoryReview booking={booking} />
			<div>Click here to update your review</div>
		</div>
	);
}
