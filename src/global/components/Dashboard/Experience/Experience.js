// Libraries
import React from 'react';

// Components
import DashboardInput from '../DashboardInput';

const Experience = ({ myArray, userData }) => {
	const experience = [
		'personal_url',
		'blog_url',
		'linkedin_url',
		'github_url',
		'twitter_url',
		'portfolio_url',
	];

	return (
		<div className='editform'>
			<h2>Linked Accounts</h2>
			{myArray.length > 0 &&
				myArray.map(item => {
					if (experience.includes(item)) {
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

export default Experience;
