// Libraries
import React, { useState, useEffect } from 'react';
import { gql } from 'apollo-boost';
import { useLazyQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';

// Styles
import './Dashboard.scss';

// Components
import LeftNavBar from './LeftNavBar';
import PaymentInfo from './PaymentInfo';
import BasicInfo from './BasicInfo';
import Experience from './Experience';

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
	const userID = {
		id: null,
	};

	const [getUser, { data: userData }] = useLazyQuery(GET_USER);
	const [editUser, setEditUser] = useState(userData);

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			userID.id = localStorage.getItem('id');
			getUser();
		}
	}, []);

	useEffect(() => {
		setEditUser(userData);
	}, [userData]);

	//myArray is used to hold the values from the returned userData.
	//We loop over the keys in the userData object and push them to myArray.
	let myArray = [];

	return (
		<div className='entire-dashboard'>
			{/* Looping over the userData and pushing to myArray
      This way we can map over the array and render input components later */}
			{userData &&
				editUser &&
				Object.keys(userData.me).forEach(field => {
					myArray.push(field);
				})}
			<div className='lower-dashboard'>
				<LeftNavBar setLoggedin={setLoggedin} />
				<div className='dashboard-routes'>
					<div className='dashboard-top-links'>
						<Link to='/dashboard'>Basic Info</Link>
						<Link to='/dashboard/experience'>Experience</Link>
						<Link to='/dashboard/paymentinfo'>Payment Info</Link>
					</div>
					<Switch>
						<Route
							exact
							path='/dashboard'
							render={props => (
								<BasicInfo {...props} myArray={myArray} userData={userData} />
							)}
						/>
						<Route
							exact
							path='/dashboard/experience'
							render={props => (
								<Experience {...props} myArray={myArray} userData={userData} />
							)}
						/>
						<Route
							exact
							path='/dashboard/paymentinfo'
							render={props => (
								<PaymentInfo {...props} myArray={myArray} userData={userData} />
							)}
						/>
					</Switch>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
