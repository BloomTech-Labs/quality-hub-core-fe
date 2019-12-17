import React from 'react';

export default function SeekerBookingContent({ booking }) {
	return (
		<div>
			{booking.report ? (
				<div className='history-report'>
					<h4>Strengths</h4>
					<p>{booking.report.strengths}</p>
					<h4>Areas of Growth</h4>
					<p>{booking.report.growthAreas}</p>
					<h4>Suggestions</h4>
					<p>{booking.report.suggestions}</p>
					<h4>Additional Feedback</h4>
					<p>{booking.report.additionalComments}</p>
				</div>
			) : (
				<p>{booking.coach.first_name} has not yet submitted a report.</p>
			)}
		</div>
	);
}
