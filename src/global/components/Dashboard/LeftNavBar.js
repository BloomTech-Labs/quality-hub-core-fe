// Libraries
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Components
import DeleteModal from './DeleteModal';

// Hooks
import useModal from '../../../utils/useModal';

export default function LeftNavBar({ setLoggedin }) {
	const [profileDropdownToggle, setProfileDropdownToggle] = useState(false);
	const { isShowing, toggle } = useModal();

	const profileDropdown = () => {
		setProfileDropdownToggle(!profileDropdownToggle);
	};

	return (
		<div className='dashboard-left-bar'>
			<p onClick={() => profileDropdown()}>
				<span className='gray-square'></span> Profile
			</p>
			{profileDropdownToggle && (
				<div className='profile-dropdown-links'>
					<Link to='/dashboard'>Basic Info</Link>
					<Link to='/dashboard/experience'>Experience</Link>
					<Link to='/dashboard/paymentinfo'>Payment Info</Link>
					<Link to='#' onClick={toggle}>
						Delete Account
					</Link>
				</div>
			)}
			<DeleteModal
				isShowing={isShowing}
				hide={toggle}
				setLoggedin={setLoggedin} // GOAL: Have this be a state variable held in Apollo Client cache
			/>
			<p>
				<span className='gray-square'></span> Schedule
			</p>
			<p>
				<span className='gray-square'></span>{' '}
				<Link to='/dashboard/interviewq'>InterviewQ</Link>
			</p>
		</div>
	);
}
