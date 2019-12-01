// Libraries
import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

// Icons
import Icon from '../../../globalIcons/Icon';
import { ICONS } from '../../../globalIcons/iconConstants';

// Components
import DeleteModal from './DeleteModal';

// Hooks
import useModal from '../../../utils/useModal';

export default function LeftNavBar({ setLoggedin }) {
	let { pathname } = useLocation();
	console.log(pathname);
	const [profileDropdownToggle, setProfileDropdownToggle] = useState(false);
	const { isShowing, toggle } = useModal();

	const profileDropdown = () => {
		setProfileDropdownToggle(!profileDropdownToggle);
	};

	return (
		<div className='dashboard-left-bar'>
			<div className='dash-left-menu-btn' onClick={() => profileDropdown()}>
				<Icon icon={ICONS.DASHBOARD} width={24} height={24} color='#3c4043' />
				<div className='dashnav-txt'>Dashboard</div>
			</div>
			{profileDropdownToggle && (
				<div className='profile-dropdown-links'>
					<NavLink to='#' onClick={toggle}>
						Delete Account
					</NavLink>
				</div>
			)}
			<DeleteModal
				isShowing={isShowing}
				hide={toggle}
				setLoggedin={setLoggedin} // GOAL: Have this be a state variable held in Apollo Client cache
			/>
			<NavLink activeClassName='dashnavactive' exact to='/dashboard'>
				<div className='dash-left-menu-btn'>
					<Icon
						icon={ICONS.PERSONALINFO}
						width={18}
						height={20}
						color={pathname === '/dashboard' ? '#096dd9' : '#3c4043'}
					/>
					<div className='dashnav-txt'>Personal Info</div>
				</div>
			</NavLink>
			<NavLink activeClassName='dashnavactive' to='/dashboard/coachinfo'>
				<div className='dash-left-menu-btn'>
					<Icon
						icon={ICONS.COACHINFO}
						width={24}
						height={24}
						color={pathname === '/dashboard/coachinfo' ? '#096dd9' : '#3c4043'}
					/>
					<div className='dashnav-txt'>Coach Info</div>
				</div>
			</NavLink>
			<NavLink activeClassName='dashnavactive' to='/dashboard/schedule'>
				<div className='dash-left-menu-btn'>
					<Icon
						icon={ICONS.SCHEDULE}
						width={24}
						height={24}
						color={pathname === '/dashboard/schedule' ? '#096dd9' : '#3c4043'}
					/>
					<div className='dashnav-txt'> Schedule</div>
				</div>
			</NavLink>
			<NavLink activeClassName='dashnavactive' to='/dashboard/setting'>
				<div className='dash-left-menu-btn'>
					<Icon
						icon={ICONS.SETTING}
						width={24}
						height={24}
						color={pathname === '/dashboard/setting' ? '#096dd9' : '#3c4043'}
					/>
					<div className='dashnav-txt'>Setting</div>
				</div>
			</NavLink>
		</div>
	);
}
