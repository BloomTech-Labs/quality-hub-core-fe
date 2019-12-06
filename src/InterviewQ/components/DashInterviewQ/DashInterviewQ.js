// Libraries
import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { GET_COACH_POST } from './Resolvers'
// Icons
import Icon from '../../../globalIcons/Icon';
import { ICONS } from '../../../globalIcons/iconConstants';

// Components
import QNav from '../QNav/QNav'
import CoachDash from './CoachDash';
import { spacecoach } from '../../../globalIcons/SpaceCoach.js'
// import Reviews from './Reviews';
// import Video from './Video';

export default function DashInterviewQ() {

	const { data: coachPost, loading } = useQuery(GET_COACH_POST, {
		variables: { coach_id: localStorage.getItem('id') },
	});
	console.log(coachPost);

	return (
		<div className='lower-dashboard'>
		<QNav />
		{loading ? null : coachPost && coachPost.postByCoach ? <CoachDash /> : (
			<div className='not-a-coach'>
							<div className='not-a-coach-header'>
				<div className='circle-blue'>
					<Icon
						icon={ICONS.COACHINFO}
						width={26}
						height={28}
						color='white'
					/>
				</div>
				<h1>Coach Info</h1>
			</div>
				<div>
				{spacecoach()}
				</div>
				<p>
				You aren't currently a coach! To become a coach, click <Link to='/interviewq'>here</Link>.
				</p>
			</div>
		)}
			
			{/* <Reviews /> */}
			{/* <Video /> */}
		</div>
	);
}
