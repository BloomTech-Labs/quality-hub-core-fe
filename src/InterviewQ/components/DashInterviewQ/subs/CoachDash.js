// Libraries
import React from 'react';

// Styles
import './CoachDash.scss';

// Components
import EditPost from './BasicInfo/00_EditPost';
import DeleteCoachPost from './DeleteCoachPost';
import CoachPostStatus from './CoachPostStatus';
import Availability from './Availability';

export default function CoachDash() {
	window.scrollTo(0, 0);
	return (
		<div className='dash-coachinfo'>
			<div className='coachinfo-header'>
				<h1>Settings</h1>
			</div>
			<EditPost />
      <div className='IQ-editform' id='interviewq-availability-header'>
				<h2>Availability</h2>
				<Availability />
			</div>
      <CoachPostStatus />
			<DeleteCoachPost />
		</div>
	);
}
