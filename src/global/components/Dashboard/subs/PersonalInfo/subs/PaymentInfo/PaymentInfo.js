// Libraries
import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

// Styles & Images
import './Payment.scss';
import StripeBadge from '../../../../../../stripe_assets/powered_by_stripe.png';

// Components
import Coach from './Coach';
import Customer from './Customer';

// Query
export const CHECK_COACH_STATUS = gql`
	query {
		me {
			id
			post {
				id
			}
		}
	}
`;

export default function PaymentInfo() {
	const { data, loading } = useQuery(CHECK_COACH_STATUS);

	return (
		<div className='dash-payment'>
			<div className='dash-payment-header'>
				<h2>Payments</h2>
				<img src={StripeBadge} alt='Powered by Stripe' />
			</div>
			{loading ? (
				<p className='dash-payment-loading'>Loading...</p>
			) : data && data.me.post ? (
				<Coach />
			) : (
				<Customer />
			)}
		</div>
	);
}
