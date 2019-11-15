import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import AvatarDropdown from './AvatarDropdown';
import GridDropdown from './GridDropdown';
import { useLazyQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const GET_USER = gql`
	query dropdownMenu {
		me {
			id
		}
	}
`;

const NavBar = ({ loggedin, setLoggedin, history }) => {
	const [getUser, { client, error, data }] = useLazyQuery(GET_USER);
	const [errorCount, setErrorCount] = useState(0);

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

	if (data && localStorage.getItem('token')) {
		setLoggedin(true);
	}

	if (error && errorCount === 0) {
		setErrorCount(1);
		client.clearStore();
		setLoggedin(false);
		logout();
	}

	return (
		<div className='styled-nav'>
			{/* Animated quailnana flying across the screen */}
			<div className='nav-left'>
				{/* <div className="bird"></div> */}
				<NavLink to='/'>
					<h2>QualityHub</h2>
				</NavLink>
				{/* Spinning Quail */}
				{/* <img
          src="http://clipartmag.com/images/quail-clipart-1.jpg"
          alt="spinning quail"
          className="rotate"
        /> */}
			</div>
			{/* End animated quailnana */}

			<div className='nav-right'>
				{/* If you're not logged in, show sign in and sign up buttons */}
				{!loggedin && (
					<>
						<NavLink to='signin'> Sign In </NavLink>
						<NavLink to='signup' className='signup-link'>
							{' '}
							Sign Up{' '}
						</NavLink>
					</>
				)}

				{/* Dropdown list of Q services */}
				<GridDropdown />

				{/* If you're logged in, show your avatar with a dropdown menu */}
				{loggedin && (
					<AvatarDropdown
						logout={logout}
						loggedin={loggedin}
						setLoggedin={setLoggedin}
						// className="hidden"
						history={history}
					/>
				)}
			</div>
		</div>
	);
};

export default NavBar;
