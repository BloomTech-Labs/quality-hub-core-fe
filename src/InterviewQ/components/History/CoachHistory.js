import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

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
		}
	}
`;

const coach_id = localStorage.getItem('id');

export default function CoachHistory() {
	const { loading, error, data } = useQuery(GET_COACHBOOKINGS, {
		variables: { coach_id },
	});

	error && console.log(error);

	return (
		<div>
			<h3>Coach History</h3>
			<div className='coach-history-headings'>
				<h4>Seeker</h4>
				<h4>Date</h4>
				<h4>Time</h4>
				<h4>Review</h4>
				<h4>Response</h4>
			</div>
			{loading && <p>Loading...</p>}
			{data &&
				data.bookingsByCoach.map(booking => (
					<CoachHistoryRow key={booking.id} booking={booking} />
				))}
		</div>
	);
}
