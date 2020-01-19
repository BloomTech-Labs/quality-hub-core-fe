import React, { useEffect } from 'react';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { useLocation } from 'react-router-dom';

import './Coach.scss';

const UPDATE_STRIPEID = gql`
	mutation addCoachStripeID($code: String) {
		addCoachStripeID(code: $code) {
			id
			stripeId
		}
	}
`;

export default function Coach() {
	const { search } = useLocation();
	const [updateStripeID] = useMutation(UPDATE_STRIPEID);

	console.log(search);

	const code = search.match(/code=(.*?)&/)
		? search.match(/code=(.*?)&/)[1]
		: null;

	useEffect(() => {
		if (code !== null) {
			// console.log('YAS');
			updateStripeID({ variables: { stripeCoachCode: code } });
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
