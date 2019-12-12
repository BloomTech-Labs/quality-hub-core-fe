import React from 'react';

export default function CoachBookingContent({ booking }) {
	return (
		<div>
			<h4>Review</h4>
			{booking.review ? (
				<div>
					<p>{booking.review}</p>
					<p>Click here to respond to this review.</p>
				</div>
			) : (
				<p>{booking.seeker.first_name} has not yet submitted a review.</p>
			)}
		</div>
	);
}
