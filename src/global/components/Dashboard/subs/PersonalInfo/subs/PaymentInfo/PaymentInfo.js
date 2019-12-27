// Libraries
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

// Components
import DashboardInput from '../DashboardInput';

// Query
const GET_PAYMENTINFO = gql`
	query {
		me {
			id
			# payment_info
		}
	}
`;

const PaymentInfo = () => {
	const { data, loading, error } = useQuery(GET_PAYMENTINFO);

	error && console.log(error);

	const keys =
		data &&
		Object.keys(data.me).filter(item => item !== 'id' && item !== '__typename');

	return (
		<div className='dash-personalinfo'>
			<div className='personalinfo-header'>
				<h2>Payments</h2>
			</div>
			<div className='editform'>
				<h3>Payment Info</h3>
				{loading && <p>Loading...</p>}
				{data &&
					keys.map(item => (
						<DashboardInput
							key={item}
							userKey={item}
							userValue={data.me[item]}
						/>
					))}
			</div>
		</div>
	);
};

export default PaymentInfo;
