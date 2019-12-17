// Libraries
import React from 'react';

// Styles
import './CoachDash.scss';

// Components
import EditPost from './BasicInfo/00_EditPost';
import DeleteCoachPost from './DeleteCoachPost/DeleteCoachPost';

export default function CoachDash() {
	window.scrollTo(0, 0);
	return (
		<div className='dash-coachinfo'>
			<div className='coachinfo-header'>
				<h1>Settings</h1>
			</div>
			<EditPost />
			<DeleteCoachPost />
		</div>
	);
}
