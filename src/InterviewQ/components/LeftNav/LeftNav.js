// Libraries
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { GET_COACH_POST } from '../DashInterviewQ/subs/Resolvers';

// Styles
import './LeftNav.scss';

// Icons
import Icon from '../../../global/icons/Icon';
import { ICONS } from '../../../global/icons/iconConstants';

export default function QNav() {
	const { pathname } = useLocation();
	// This query attempts to check if the current user has created a coach listing
	// If a coach listing from the current user does exist, the user's current id is stored in the coach_id variable
	const { data: coachPost, loading } = useQuery(GET_COACH_POST, {
		variables: { coach_id: localStorage.getItem('authId') },
	});

	return (

		<div className='QNav'>
			<NavLink to='/interviewq' exact activeClassName='QNav-row-highlight'>
				<div className='QNav-row'>
					<Icon
						icon={ICONS.INTERVIEWQ}
						width={24}
						height={22}
						color={!pathname.includes('interviewq/') ? 'white' : '#096dd9'}
					/>
					<div className='QNav-btn'>Search Coach</div>
				</div>
			</NavLink>

			<NavLink activeClassName='QNav-row-highlight' to='/interviewq/schedule'>
				<div className='QNav-row'>
					<Icon
						icon={ICONS.SCHEDULE}
						width={24}
						height={24}
						color={
							pathname === '/interviewq/schedule' ||
								pathname === '/interviewq/schedule/week'
								? 'white'
								: '#096dd9'
						}
					/>
					<div className='QNav-btn'>Schedule</div>
				</div>
			</NavLink>

			<NavLink to='/interviewq/inbox' activeClassName='QNav-row-highlight'>
				<div className='QNav-row'>
					<Icon
						icon={ICONS.INBOX}
						width={24}
						height={21}
						color={pathname.includes('inbox') ? 'white' : '#096dd9'}
					/>
					<div className='QNav-btn'>Inbox</div>
				</div>
			</NavLink>

			<NavLink to='/interviewq/history' activeClassName='QNav-row-highlight'>
				<div className='QNav-row'>
					<Icon
						icon={ICONS.CLOCK}
						width={24}
						height={21}
						color={pathname.includes('history') ? 'white' : '#096dd9'}
					/>
					<div className='QNav-btn'>History</div>
				</div>
			</NavLink>

			{/* If the current user has posted a coach listing, show the "settings" button in the left nav, if not, then hide the "settings" button */}
			{loading ? null : coachPost && coachPost.postByCoach ? (
				<NavLink to='/interviewq/settings' activeClassName='QNav-row-highlight'>
					<div className='QNav-row'>
						<Icon
							icon={ICONS.SETTING}
							width={24}
							height={22}
							color={pathname.includes('settings') ? 'white' : '#096dd9'}
						/>
						<div className='QNav-btn'>Settings</div>
					</div>
				</NavLink>
			) : (
					null
				)}
		</div>

	);
}
