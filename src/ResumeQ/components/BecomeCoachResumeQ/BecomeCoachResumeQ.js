// This component is deprecated and no longer used

// // Libraries
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { useLazyQuery } from '@apollo/react-hooks';

// // Components
// import ListingForm from '../ListingForm';

// // Resolver
// import { GET_USER } from '../Marketplace/Resolvers';

// export default function BecomeCoachResumeQ() {
// 	const [hasListing, setHasListing] = useState();
// 	console.log(`BecomeCoachResumeQ / hasListing`, hasListing);

// 	const [getUser, { refetch, loading, data: userData }] = useLazyQuery(
// 		GET_USER,
// 	);

// 	useEffect(() => {
// 		//only check for current user if there is a token
// 		if (localStorage.getItem('token')) {
// 			getUser();
// 		}
// 		// eslint-disable-next-line
// 	}, []);

// 	useEffect(() => {
// 		if (userData) {
// 			setHasListing(userData.me.reviewerListing);
// 		}
// 	}, [userData]);

// 	return (
// 		<div>
// 			{localStorage.getItem('token') ? (
// 				//if user data is done loading...
// 				!loading ? (
// 					hasListing ? (
// 						//if you have a post made, show edit
// 						<Link
// 							to='/resumeq/settings'
// 							className='become-a-coach-reroute-to-signin'>
// 							<button className='become-a-coach-btn'>
// 								<span className='add-coach-form-button'>Edit Listing</span>
// 							</button>
// 						</Link>
// 					) : (
// 							//if no post made, allow to create a post
// 							<ListingForm refetch={refetch} />
// 						)
// 				) : //while checking if user has a post, leave button off page
// 					null
// 			) : (
// 					//if no token link to signin
// 					<Link to='/resumeq' className='become-a-coach-reroute-to-signin'>
// 						<button className='become-a-coach-btn'>
// 							<span className='add-coach-form-button'>Create a listing</span>
// 						</button>
// 					</Link>
// 				)}
// 		</div>
// 	);
// }
