// Libraries
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { GET_USERS_LISTING } from './subs/Resolvers';
import { GET_USER } from '../Marketplace/Resolvers'

// Icons
// import Icon from '../../../global/icons/Icon';
// import { ICONS } from '../../../global/icons/iconConstants';

import becomecoach from '../../../global/icons/becomecoach.png';

// Components
import CoachDash from './subs/CoachDash';

export default function DashResumeQ() {

	const { data, loading } = useQuery(GET_USERS_LISTING)
	console.log('user listing data',data)
	const reviewerListing = data.listingByReviewer

	

	return (
		<div className='lower-dashboard'>
			{loading ? null : reviewerListing && reviewerListing ? (
				<CoachDash />
			) : (
					<div className='not-a-coach'>
						{/* <div className='not-a-coach-header'>
						<h2>Settings</h2>
					</div> */}
						{/* <div>{spacecoach()}</div> */}
						<img src={becomecoach} />
						{/* <p>
						You aren't currently a coach! To become a coach, click{' '}
						<Link className='not-a-coach-here' to='/interviewq'>
							here
						</Link>
						.
					</p> */}
						<p>To become a Reviewer, go to any QualityHub service and click the "Become a Reviewer" button.</p>
					</div>
				)}
		</div>
	);
}
