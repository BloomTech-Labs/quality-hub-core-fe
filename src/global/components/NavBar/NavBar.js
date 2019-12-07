import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import AvatarDropdown from './AvatarDropdown';
import GridDropdown from './GridDropdown';
import { useLazyQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import {Bellicon} from '../../../globalIcons/bellicon';

import {Hamburger} from '../../../globalIcons/hamburger';

const GET_USER = gql`
	query dropdownMenu {
		me {
			id
		}
	}
`;

const NavBar = ({ loggedin, setLoggedin, history }) => {
	const location = useLocation();
	const [getUser, { client, error, data, loading }] = useLazyQuery(GET_USER);
	const [errorCount, setErrorCount] = useState(0);

	const title = location.pathname.match(/\/(.*)q/);
	const navtitle =
		title && title[1].charAt(0).toUpperCase() + title[1].substring(1);


	const logout = () => {
		localStorage.clear();
		setLoggedin(false);
		history.push('/');
	};

	// On render, pull stored token. If you have a token, log yourself in.
	useEffect(() => {
		//if you have a token, pull some user data to make sure it's valid
		if (localStorage.getItem('token')) {
			getUser();
		}
	}, []);

	//If user query came back with data and you have a token in localStorage, log in.
	if (data && localStorage.getItem('token')) {
		setLoggedin(true);
	}


	if (error && errorCount === 0) {
		if (error == 'Error: Network error: Failed to fetch') {
		} else {
			setErrorCount(1);
			client.clearStore();
			setLoggedin(false);
			logout();
		}
	}

	return (
		<div className="styled-nav" id="main-navbar">
			<div className="nav-left">
				<NavLink to="/">
					<div className="navbar-hamburger-and-title"><div className="navbar-hamburger-icon">{Hamburger()}</div><h2>QualityHub{navtitle && `: ${navtitle}Q`}</h2></div>
				</NavLink>
			</div>

			<div className="nav-right">
				{/* If you're not logged in, and query is not loading to check if your token is valid, show sign in and sign up buttons */}
				{!loggedin && !loading && (
					<>
						<NavLink to="signin"> Sign In </NavLink>
						<NavLink to="signup" className="signup-link">
							{' '}
							Sign Up{' '}
						</NavLink>
					</>
				)}

				{Bellicon()}
				{/* Dropdown list of Q services */}
				<GridDropdown />

				{/* If you're logged in, show your avatar with a dropdown menu */}
				{loggedin && (
					<AvatarDropdown
						logout={logout}
						loggedin={loggedin}
						setLoggedin={setLoggedin}
						history={history}
					/>
				)}
			</div>
		</div>
	);
};

export default NavBar;
