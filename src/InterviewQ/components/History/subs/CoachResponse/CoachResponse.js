import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

import AddCoachResponse from './AddCoachResponse';
import ViewCoachResponse from './ViewCoachResponse';

const HAVE_RESPONSE = gql`
	query checkResponse($uniqueBooking: String!) {
		responseByBooking(uniqueBooking: $uniqueBooking) {
			id
		}
	}
`;

export default function CoachResponse({ uniqueBooking }) {
	const [showResponse, setShowResponse] = useState(false);

	const { data } = useQuery(HAVE_RESPONSE, {
		variables: { uniqueBooking },
	});

	return (
		<div className='coach-response'>
			{data && data.responseByBooking ? (
				<ViewCoachResponse />
			) : (
				<>
					{!showResponse && (
						<button
							className='toggle-coach-response-btn'
							onClick={() => setShowResponse(true)}>
							Reply
						</button>
					)}
					{showResponse && (
						<AddCoachResponse
							setShowResponse={setShowResponse}
							uniqueBooking={uniqueBooking}
						/>
					)}
				</>
			)}
		</div>
	);
}
