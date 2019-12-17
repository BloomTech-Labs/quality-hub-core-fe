// Libraries
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

// Components
import DashboardInput from '../DashboardInput';

// Query
const GET_ACCOUNTS = gql`
	query {
		me {
			id
			linkedin: linkedin_url
			github: github_url
			personal: personal_url
			twitter: twitter_url
			portfolio: portfolio_url
			blog: blog_url
		}
	}
`;

const Experience = () => {
	const { data, loading, error } = useQuery(GET_ACCOUNTS);

	error && console.log(error);

	const keys =
		data &&
		Object.keys(data.me).filter(item => item !== 'id' && item !== '__typename');

	return (
		<div className='editform'>
			<h3>Linked Accounts</h3>
			{loading && <p>Loading...</p>}
			{data &&
				keys.map(item => (
					<DashboardInput
						key={item}
						userKey={item}
						userValue={data.me[item]}
						isLink={true}
					/>
				))}
		</div>
	);
};

export default Experience;
