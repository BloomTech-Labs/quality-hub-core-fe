import React from 'react';
import { Elements } from 'react-stripe-elements';
import './Stripe.scss';

import CheckoutForm from './CheckoutForm';

export default function Stripe() {
	return (
		<Elements>
			<CheckoutForm />
		</Elements>
	);
}
