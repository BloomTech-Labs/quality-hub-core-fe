import React from 'react';

import HistoryReview from '../HistoryReview';

export default function SeekerHistoryReview({ booking }) {
	return (
		<div>
			<HistoryReview booking={booking} />
		</div>
	);
}
