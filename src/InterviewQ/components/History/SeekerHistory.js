import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import SeekerHistoryRow from './SeekerHistoryRow';

const GET_SEEKERBOOKINGS = gql`
	query getSeekerHistory($seeker_id: String!) {
		bookingsBySeeker(seeker_id: $seeker_id) {
			id
			year
			month
			day
			hour
			minute
			coach {
				first_name
				last_name
			}
			uniquecheck
			report {
				strengths
				growthAreas
				suggestions
				additionalComments
			}
		}
	}
`;

const seeker_id = localStorage.getItem('id');

export default function SeekerHistory() {
	const { loading, error, data } = useQuery(GET_SEEKERBOOKINGS, {
		variables: { seeker_id },
	});

	error && console.log(error);

	return (
		<div>
			<h3>Seeker History</h3>
			<div className='seeker-history-headings'>
				<h4>Coach</h4>
				<h4>Date</h4>
				<h4>Time</h4>
				<h4>Report</h4>
			</div>
			{loading && <p>Loading...</p>}
			{data &&
				data.bookingsBySeeker.map(booking => (
					<SeekerHistoryRow key={booking.id} booking={booking} />
				))}
		</div>
	);
}
