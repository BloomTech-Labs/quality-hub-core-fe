import React from 'react';
//import { NavLink } from "react-router-dom";

const CompletedSignUp = () => {
	return (
		<div className='completed-sign-up'>
			<h3>You're All Done!</h3>
			{/* <NavLink to="/signin">
            <h3>Click Here to Login</h3>
            </NavLink> */}
			<p>You'll be redirected to your dashboard in a moment</p>
			<img
				className='quail-walk'
				src='https://i.imgur.com/ABm9pT1.gif'
				alt='animation of quail walking'
			/>
		</div>
	);
};

export default CompletedSignUp;
