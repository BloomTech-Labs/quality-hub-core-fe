import React, { useState } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { useMutation } from '@apollo/react-hooks';

import { PAYMENT } from './Resolvers';

const CheckoutForm = props => {
	const [complete, setComplete] = useState(false);

	const [makePayment, { loading, error, called }] = useMutation(PAYMENT);

	const handleSubmit = async e => {
		let { token, error } = await props.stripe.createToken({
			type: 'card',
		});
		if (error) {
			alert(error.message);
		} else {
			makePayment({
				variables: {
					amount: props.price * 100,
					currency: 'USD',
					source: token.id,
					coach: props.coachId,
				},
			})
				.then(res => {console.log('here',res);setComplete(true)})
				.catch(err => alert(err.message));
		}
	};
	return (
		<div className='checkout'>
			<div className='checkout-header'>
				<h2>Payment Information</h2>
			</div>
			<div className='checkout-box'>
				{complete ? (
					<h3>Purchase Complete!</h3>
				) : loading ? (
					'Processing payment...'
				) : (
					<>
						<p>Would you like to complete the purchase?</p>
						<CardElement />
						<button onClick={handleSubmit}>Purchase</button>
					</>
				)}
			</div>
		</div>
	);
};

export default injectStripe(CheckoutForm);
