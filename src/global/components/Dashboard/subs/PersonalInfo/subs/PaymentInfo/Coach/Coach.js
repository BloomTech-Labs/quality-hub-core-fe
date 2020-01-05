import React, { useEffect } from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

import './Coach.scss';

import CoachSetup from './CoachSetup';
import CoachLink from './CoachLink';

const CHECK_COACH_STATUS = gql`
	query user($id: ID!) {
		user(id: $id) {
			stripeCoachConnected
		}
	}
`;

export default function Coach() {
	const { data } = useQuery(CHECK_COACH_STATUS, {
		variables: { id: localStorage.getItem('id') },
	});

	return (
		<div className='dash-coach'>
			{data && data.user.stripeCoachConnected ? <CoachLink /> : <CoachSetup />}
		</div>
	);
}
