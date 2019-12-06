// Libraries
import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { Route, Switch } from 'react-router-dom';

// Styles
import './Dashboard.scss';

// Components
import LeftNavBar from './LeftNavBar';
import PersonalInfo from './PersonalInfo';
import Schedule from './Schedule';
import DashInterviewQ from '../../../InterviewQ/components/DashInterviewQ';
// GraphQuaiL Query
const GET_USER = gql`
	query {
		me {
			id
			bio
			first_name
			last_name
			email
			city
			state
			linkedin_url
			github_url
			portfolio_url
			personal_url
			gender
			twitter_url
			blog_url
			payment_info
		}
	}
`;

//COMponent - <Ryan's accent>
const Dashboard = ({ setLoggedin }) => {
	useQuery(GET_USER);

	return (
		<div className='entire-dashboard'>
			<LeftNavBar setLoggedin={setLoggedin} />
			<div className='lower-dashboard'>
				<Switch>
					<Route exact path='/dashboard'>
						<PersonalInfo />
					</Route>
					<Route  path='/dashboard/schedule'>
						<Schedule />
					</Route>
					{/* <Route exact path='/dashboard/coachinfo'>
						<DashInterviewQ />
					</Route> */}
				</Switch>
			</div>
		</div>
	);
};

export default Dashboard;
