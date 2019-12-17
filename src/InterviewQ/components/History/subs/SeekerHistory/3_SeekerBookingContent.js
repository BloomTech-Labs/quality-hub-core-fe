import React from 'react';

export default function SeekerBookingContent({ booking }) {
	console.log(booking);

	return (
		<div>
			<h3>InterviewQ Report</h3>
			<p>
				Coach: {booking.coach.first_name} {booking.coach.last_name}
			</p>
			<p>
				Date: {booking.month}/{booking.day}/{booking.year}
			</p>
			<p>
				Time: {booking.hour}:{booking.minute}
				{booking.minute === 0 && '0'}
			</p>
			{booking.report ? (
				<div>
					<h4>Strengths</h4>
					<p>{booking.report.strengths}</p>
					<h4>Areas of Growth</h4>
					<p>{booking.report.growth}</p>
					<h4>Suggestions</h4>
					<p>{booking.report.suggestions}</p>
					<h4>Additional Comments</h4>
					<p>{booking.report.comments}</p>
				</div>
			) : (
				<p>{booking.coach.first_name} has not yet submitted a report.</p>
			)}
		</div>
	);
}
