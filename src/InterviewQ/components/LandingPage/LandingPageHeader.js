// Libraries
import React from 'react';

// Icons
import Icon from '../../../global/icons/Icon';
import { ICONS } from '../../../global/icons/iconConstants';

export default function LandingPageHeader() {
	return (
		<div className='interview-header'>
			<span className='red-circle'>
				<Icon
					icon={ICONS.INTERVIEWQ_LARGE}
					width={66}
					height={66}
					color='white'
				/>
			</span>
			<h1>InterviewQ</h1>
		</div>
	);
}
