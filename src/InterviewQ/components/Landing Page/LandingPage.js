// Library
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

// Styles & Icons
import './LandingPage.scss';
import Icon from '../../../globalIcons/Icon';
import { ICONS } from '../../../globalIcons/iconConstants';
import { lightbulb2 } from '../../../globalIcons/lightbulb2';

// Components
// import LandingPageCTA from './LandingPageCTA';
import LandingPageHeader from './LandingPageHeader';
import QNav from '../QNav';
// import Search from '../Search';
import CoachList from '../CoachList/CoachList';
import CoachForm from '../CoachForm/CoachForm';

export const GET_USER = gql`
	query {
		me {
			id
			post {
				id
			}
		}
	}
`;

export default function InterviewLandingPage() {
	const [toggleFilter, setToggleFilter] = useState(true);
	const [hasPost, setHasPost] = useState();
	const [fields, setFields] = useState({
		tag: '',
		price: '',
		industry: '',
		orderBy: '',
	});

	const { refetch, loading, error, data: userData } = useQuery(GET_USER);

	useEffect(() => {
		refetch();
	}, []);

	useEffect(() => {
		if (userData) {
			setHasPost(userData.me.post);
		}
	}, [userData]);

	return (
		<div className='interview-container' id='interview-container'>
			{/* <LandingPageCTA /> */}
			<div className='interview-landing-page'>
				<QNav />
				<div className='interviewq-header-container'>
					<LandingPageHeader />
					<div className='interviewq-header-btns'>
						{localStorage.getItem('token') ? (
							//if user data is done loading...
							!loading ? (
								hasPost ? (
									//if you have a post made, show edit
									<Link
										to='/dashboard/coachinfo'
										className='become-a-coach-reroute-to-signin'>
										<button className='become-a-coach-btn'>
											{/* <Icon icon={ICONS.LIGHTBULB} width={16} height={22} /> */}
											{lightbulb2()}
											<span className='add-coach-form-button'>Edit Post</span>
										</button>
									</Link>
								) : (
									//if no post made, allow to create a post
									<CoachForm refetch={refetch} />
								)
							) : //while checking if user has a post, leave button off page
							null
						) : (
							//if no token link to signin
							<Link to='/signup' className='become-a-coach-reroute-to-signin'>
								<button className='become-a-coach-btn'>
									{/* <Icon icon={ICONS.LIGHTBULB} width={16} height={22} /> */}
									{lightbulb2()}
									<span className='add-coach-form-button'>Become a coach</span>
								</button>
							</Link>
						)}
						<button
							onClick={() => setToggleFilter(!toggleFilter)}
							style={{
								background: toggleFilter && 'rgba(9, 109, 217, 0.1)',
								color: toggleFilter && '#096dd9',
								border: toggleFilter && '1px solid #096dd9',
							}}>
							<Icon
								icon={ICONS.FILTER}
								width={20}
								height={18}
								color={toggleFilter ? '#096dd9' : '#5f6368'}
							/>
							<span className='filters-btn'>Filters </span>
						</button>
					</div>
				</div>
				<div className='landingpage-container'>
					<CoachList toggleFilter={toggleFilter} />
				</div>
			</div>
		</div>
	);
}
