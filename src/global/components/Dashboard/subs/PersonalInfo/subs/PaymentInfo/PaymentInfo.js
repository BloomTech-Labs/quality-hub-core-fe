// Libraries
import React from 'react';

import './Payment.scss';

import Coach from './Coach';
import Customer from './Customer';

export default function PaymentInfo() {
	return (
		<div className='dash-payment'>
			<div className='dash-payment-header'>
				<h2>Payments</h2>
			</div>
			<Coach />
			<Customer />
		</div>
	);
}
