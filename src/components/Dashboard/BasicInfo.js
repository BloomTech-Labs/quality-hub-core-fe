import React from 'react';

import DashboardPicture from '../DashboardPicture';
import DashboardInput from '../DashboardInput';

const BasicInfo = ({ myArray, basicInfo, userData }) => {
	return (
		<div className='editform'>
			<DashboardPicture />
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
