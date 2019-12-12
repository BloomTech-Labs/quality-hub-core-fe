// Libraries
import React from 'react';
import { NavLink } from 'react-router-dom';

// Styles
import './QNav.scss';

// Icons
import Icon from '../../../globalIcons/Icon';
import { ICONS } from '../../../globalIcons/iconConstants';
// import { clock } from '../../../globalIcons/Clock'

export default function QNav() {
	return (
		<div className='QNav'>
			<>
				<NavLink to='/interviewq' exact activeClassName='QNav-row-highlight'>
					<div className='QNav-row'>
						<Icon icon={ICONS.INTERVIEWQ} width={24} height={22} />
						<div className='QNav-btn'>InterviewQ</div>
					</div>
				</NavLink>
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
				<NavLink to='/interviewq/history' activeClassName='QNav-row-highlight'>
					<div className='QNav-row'>
						<div className='QNav-btn'>History</div>
					</div>
				</NavLink>

				<NavLink to='/interviewq/settings' activeClassName='QNav-row-highlight'>
					<div className='QNav-row'>
						<Icon icon={ICONS.SETTING} width={24} height={22} />
						<div className='QNav-btn'>Settings</div>
					</div>
				</NavLink>
			</>
		</div>
	);
}
