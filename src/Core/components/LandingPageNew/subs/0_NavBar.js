// Libraries
import React from 'react';
import { NavLink } from 'react-router-dom';

// Components
import AvatarDropdown from '../../../../global/components/NavBar/subs/AvatarDropdown';
import GridDropdown from '../../../../global/components/NavBar/subs/GridDropdown';

export default function NavBar({ loggedin, setLoggedin, history }) {
	const logout = () => {
		localStorage.clear();
		setLoggedin(false);
		history.push('/');
	};

	return (
		<div className='landing-page-nav'>
			<h1>QualityHub</h1>
			<div className='landing-page-nav-right'>
				<a className='landing-page-nav-link' href='#about'>
					About
				</a>
				<a className='landing-page-nav-link' href='#services'>
					Services
				</a>
				{!localStorage.getItem('token') && (
					<>
						<NavLink className='landing-page-nav-link' to='/signin'>
							Sign in
						</NavLink>
						<NavLink className='landing-page-nav-link' to='/signup'>
							Sign up
						</NavLink>
					</>
				)}
				<div className='landing-page-nav-grid-dropdown'>
					<GridDropdown />
				</div>
				{localStorage.getItem('token') && (
					<div className='landing-page-nav-avatar'>
						<AvatarDropdown
							logout={logout}
							loggedin={loggedin}
							setLoggedin={setLoggedin}
							history={history}
						/>
					</div>
				)}
			</div>
		</div>
	);
}
