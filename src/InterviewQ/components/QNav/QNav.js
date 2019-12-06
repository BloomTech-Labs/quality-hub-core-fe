// Libraries
import React from 'react';
import { Link } from 'react-router-dom';

// Styles
import './QNav.scss';

// Icons
import Icon from '../../../globalIcons/Icon';
import { ICONS } from '../../../globalIcons/iconConstants';
import { clock } from '../../../globalIcons/Clock'

export default function QNav() {
	return (
		<div className='QNav'>
			<>
			<Link to='/interviewq'>
				<div className='QNav-row QNav-row-highlight'>
				<Icon icon={ICONS.INTERVIEWQ} width={24} height={22} />
					<div className='QNav-btn'>InterviewQ</div>
				</div>
			</Link>
			{/* <Link to='/interviewq/availability'>
				<div className='QNav-row'>
					{/* <Icon
						icon={ICONS.EMAIL}
						width={24}
						height={24}
						color='#096dd9'
					/> 
					{clock()}
					<div className='QNav-btn'>Availabilty</div>
				</div>
				</Link> */}
			
			<Link to='/interviewq/settings'>
				<div className='QNav-row'>
					<Icon icon={ICONS.SETTING} width={24} height={22} />
					<div className='QNav-btn'>Settings</div>
				</div>
			</Link>
			</>
		</div>
	);
}
