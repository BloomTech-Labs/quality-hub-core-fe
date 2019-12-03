// Libraries
import React from 'react';

// Icons
import Icon from '../../../globalIcons/Icon';
import { ICONS } from '../../../globalIcons/iconConstants';

// Components
import BasicInfo from './BasicInfo';
import Accounts from './Accounts';
import PaymentInfo from './PaymentInfo';

export default function PersonalInfo() {
	return (
		<div className='dash-personalinfo'>
			<div className='personalinfo-header'>
				<div className='circle-blue'>
					<Icon
						icon={ICONS.PERSONALINFOBIG}
						width={26}
						height={28}
						color='white'
					/>
				</div>
				<h1>Personal Info</h1>
			</div>
			<BasicInfo />
			<Accounts />
			<PaymentInfo />
		</div>
	);
}
