import React from 'react';
import DashboardInput from '../DashboardInput';

const PaymentInfo = ({ myArray, paymentInfo, userData }) => {
	return (
		<div className='editform'>
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
