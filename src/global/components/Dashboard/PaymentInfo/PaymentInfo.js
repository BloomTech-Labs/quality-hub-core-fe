// Libraries
import React from 'react';

// Components
import DashboardInput from '../DashboardInput';

const PaymentInfo = ({ myArray, userData }) => {
	const paymentInfo = ['payment_info'];

	return (
		<div className='editform'>
			<h2>Payment Info</h2>
			{myArray.length > 0 &&
				myArray.map(item => {
					if (paymentInfo.includes(item)) {
						return (
							<DashboardInput
								key={item}
								userKey={item}
								userValue={userData.me[item]}
							/>
						);
					} else {
						return null;
					}
				})}
		</div>
	);
};

export default PaymentInfo;
