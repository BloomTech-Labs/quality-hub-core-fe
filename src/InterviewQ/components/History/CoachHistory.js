import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import { isPast } from '../../../utils/isPast';

import CoachHistoryRow from './CoachHistoryRow';

const GET_COACHBOOKINGS = gql`
	query getCoachHistory($coach_id: String!) {
		bookingsByCoach(coach_id: $coach_id) {
			id
			year
			month
			day
			hour
			minute
			seeker {
				first_name
				last_name
			}
			uniquecheck
			review {
				rating
				review
			}
			response {
				text
			}
			report {
				id
			}
		}
	}
`;



export default function CoachHistory() {
  const coach_id = localStorage.getItem('id');
	const { loading, error, data } = useQuery(GET_COACHBOOKINGS, {
		variables: { coach_id },
	});

	error && console.log(error);

	const filteredData = data
		? data.bookingsByCoach.filter(booking =>
				isPast(
					booking.year,
					booking.month,
					booking.day,
					booking.hour,
					booking.minute,
				),
		  )
		: [];

	return (
		<div>
			<h3>Coach History</h3>
			{data && filteredData.length ? (
				<div className='coach-history-headings'>
					<h4>Seeker</h4>
					<h4>Date</h4>
					<h4>Time</h4>
					<h4>Report</h4>
					<h4>Review</h4>
				</div>
			) : (
				<p>You have no previous bookings as a Coach</p>
			)}
			{loading && <p>Loading...</p>}
			{data &&
				filteredData.map(booking => (
					<CoachHistoryRow key={booking.id} booking={booking} />
				))}
		</div>
	);
}
