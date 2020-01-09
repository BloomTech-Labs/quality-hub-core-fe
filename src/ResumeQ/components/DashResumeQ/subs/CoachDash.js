// Libraries
import React, { useEffect } from 'react';

// Styles
import './CoachDash.scss';

// Components
import EditListing from './BasicInfo/00_EditPost';
import DeleteReviewerListing from './DeleteCoachPost';
import ReviewerListingStatus from './CoachPostStatus';
// import Availability from './Availability';

export default function ReviewerDash() {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<div className='dash-coachinfo'>
			<div className='coachinfo-header'>
				<h1>Settings</h1>
			</div>
			<EditListing />
			{/* <Availability /> */}
			<DeleteReviewerListing />
			<ReviewerListingStatus />
		</div>
	);
}
