// Libraries
import React from 'react';

// Styles
import './DashboardAvatar.scss';

// Components
import Avatar from '../../../../../../Avatar';

export default function DashboardAvatar() {
	return (
		<div className='dash-avatar-wrapper'>
			<span className='dash-heading'>
				<h4>Photo</h4>
			</span>
			<Avatar />
		</div>
	);
}
