// Libraries
import React from 'react';

// Styles
import './DashboardAvatar.scss';

// Components
import Avatar from '../../../../../global/components/Avatar';

export default function DashboardAvatar() {
	return (
		<div className='dash-avatar-wrapper'>
			<h2 className='dash-avatar-heading'>Avatar</h2>
			<Avatar />
		</div>
	);
}
