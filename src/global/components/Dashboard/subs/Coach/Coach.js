import React, { useEffect } from 'react';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { useLocation } from 'react-router-dom';

import './Coach.scss';

const UPDATE_USER = gql`
	mutation update($stripeCoachCode: String) {
		update(stripeCoachCode: $stripeCoachCode) {
			id
			stripeCoachCode
		}
	}
`;

export default function Coach() {
	const { search } = useLocation();
	const [updateUser] = useMutation(UPDATE_USER);

	const code = search.match(/code=(.*?)&/)
		? search.match(/code=(.*?)&/)[1]
		: null;

	useEffect(() => {
		if (code !== null) {
			console.log('YAS');
			updateUser({ variables: { stripeCoachCode: code } });
		}
	}, [code]);

	return (
		<div className='dash-coach'>
			<div className='dash-coach-header'>
				<h2>Coach</h2>
			</div>
			<div className='dash-coach-connectstripe'>
				<button>
					<a href='https://connect.stripe.com/express/oauth/authorize?client_id=ca_GKVyZQTkuxAMwbF3TPVvax4ZBwoafQea&state={STATE_VALUE}'>
						Connect to Stripe
					</a>
				</button>
			</div>
		</div>
	);
}
