import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { CardElement, injectStripe } from 'react-stripe-elements';

const CheckoutForm = props => {
	const [complete, setComplete] = useState(false);
	const { coachId } = useParams();
	console.log(coachId);

	const handleSubmit = async ev => {
		let { token } = await props.stripe.createToken({ name: 'Name' });

		console.log(token);
		// let response = await fetch('/charge', {
		// 	method: 'POST',
		// 	headers: { 'Content-Type': 'text/plain' },
		// 	body: token.id,
		// });

		// if (response.ok) setComplete(true);

		// // Logic in this area: should make mutation to stripeDirectCharge
		// // source is token
	};

	return (
		<div className='checkout'>
			<div className='checkout-header'>
				<h2>Payment Information</h2>
			</div>
			<div className='checkout-box'>
				{complete ? (
					<h3>Purchase Complete!</h3>
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
