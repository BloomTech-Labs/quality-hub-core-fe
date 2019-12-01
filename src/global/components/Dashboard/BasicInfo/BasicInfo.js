// Libraries
import React from 'react';

// Components
import DashboardAvatar from './DashboardAvatar';
import DashboardInput from '../DashboardInput';

const BasicInfo = ({ myArray, userData }) => {
	const basicInfo = [
		'bio',
		'first_name',
		'last_name',
		'email',
		'city',
		'state',
	];

	return (
		<div className='editform'>
			<h2>Basic Info</h2>
			<DashboardAvatar />
			{myArray.length > 0 &&
				myArray.map(item => {
					if (basicInfo.includes(item)) {
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

export default BasicInfo;
