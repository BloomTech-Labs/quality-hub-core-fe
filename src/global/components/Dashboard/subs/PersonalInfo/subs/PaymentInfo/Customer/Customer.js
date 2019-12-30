// Libraries
import React from 'react';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

import './Customer.scss';

export default function Customer() {
	return (
		<div className='dash-customer-connectstripe'>
			<h3>Set up Customer Account on Stripe</h3>
			<div className='dash-payment-row'>
				<p>
					Click above to set up your Stripe account to pay for QualityHub
					services
				</p>
				<button>
					<a href='#'>Connect to Stripe</a>
				</button>
			</div>
		</div>
	);
}
