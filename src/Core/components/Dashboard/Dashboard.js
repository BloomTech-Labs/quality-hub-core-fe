import React, { useState, useEffect } from 'react';
import { gql } from 'apollo-boost';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import PaymentInfo from './PaymentInfo';
import BasicInfo from './BasicInfo';
import Experience from './Experience';
import DeleteModal from './DeleteModal';
import './Dashboard.scss';
import useModal from '../../../utils/useModal';

export const DELETE_USER = gql`
	mutation {
		deleteUser {
			first_name
			last_name
			id
		}
	}
`;

//GraphQuaiL Query
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
const Dashboard = props => {
	const userID = {
		id: null,
	};

	const [getUser, { client, data: userData }] = useLazyQuery(GET_USER);
	const [deleteThatUser, changeDeleteThatUser] = useMutation(DELETE_USER);
	const [editUser, setEditUser] = useState(userData);
	const [profileDropdownToggle, setProfileDropdownToggle] = useState(false);
	const { isShowing, toggle } = useModal();

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

	//basicInfo, experience, and paymentInfo create constraints of which fields go into which are on the dashboard.
	const basicInfo = [
		'bio',
		'first_name',
		'last_name',
		'email',
		'city',
		'state',
	];
	const experience = [
		'personal_url',
		'blog_url',
		'linkedin_url',
		'github_url',
		'twitter_url',
		'portfolio_url',
	];
	const paymentInfo = ['payment_info'];

	const profileDropdown = () => {
		setProfileDropdownToggle(!profileDropdownToggle);
	};

	const deleteAccount = () => {
		deleteThatUser().then(res => {
			client.clearStore();
			localStorage.clear();
			props.setLoggedin(false);
			props.history.push('/');
		});
	};

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
				<div className='dashboard-left-bar'>
					{/* <Link to="/dashboard"> */}
					<p onClick={() => profileDropdown()}>
						<span className='gray-square'></span> Profile
					</p>
					{profileDropdownToggle && (
						<div className='profile-dropdown-links'>
							<Link to='/dashboard'>Basic Info</Link>
							<Link to='/dashboard/experience'>Experience</Link>
							<Link to='/dashboard/paymentinfo'>Payment Info</Link>
							<Link to='#' onClick={toggle}>
								Delete Account
							</Link>
						</div>
					)}
					<DeleteModal
						isShowing={isShowing}
						hide={toggle}
						deleteAccount={deleteAccount}
					/>
					{/* </Link> */}
					{/* <Link to="/dashboard"> */}
					<p>
						<span className='gray-square'></span> Schedule
					</p>
					{/* </Link> */}
				</div>
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
								<BasicInfo
									{...props}
									myArray={myArray}
									basicInfo={basicInfo} //basicInfo is an array that contains the names of all the fields we want to use on this page
									userData={userData}
								/>
							)}
						/>
						<Route
							exact
							path='/dashboard/experience'
							render={props => (
								<Experience
									{...props}
									myArray={myArray}
									experience={experience} //experience is an array that contains the names of all the fields we want to use on this page
									userData={userData}
								/>
							)}
						/>
						<Route
							exact
							path='/dashboard/paymentinfo'
							render={props => (
								<PaymentInfo
									{...props}
									myArray={myArray}
									paymentInfo={paymentInfo} //paymentInfo is an array that contains the names of all the fields we want to use on this page
									userData={userData}
								/>
							)}
						/>
					</Switch>
				</div>

				{/* <button className='danger'>Delete MEEEEE</button> */}
			</div>
		</div>
	);
};

export default Dashboard;
