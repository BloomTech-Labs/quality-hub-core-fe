import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Link } from 'react-router-dom';
import './SignUpForm.scss';

import Loading from '../Loading';

const CHECK_EMAIL = gql`
	mutation checkEmail($email: String!) {
		checkEmail(email: $email)
	}
`;

export default function SignUp({
	user,
	setUser,
	setProgress,
	setEmailTouched,
	setPasswordTouched,
}) {
	const [verifyEmail, verifyEmailMutation] = useMutation(CHECK_EMAIL);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const handleChange = e => {
		if (e.target.name === 'email') {
			setError(false);
		}
		setUser({
			...user,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = e => {
		e.preventDefault();
		verifyEmail({ variables: { email: user.email } })
			.then(res => {
				setProgress(0);
			})
			.catch(err => {
				setError('Email address unavailable, please try again');
			});

		//check if email is valid
		//then setProgress to 0
		//else show error
		// setProgress(0);
	};

	return (
		<div className='sign-up'>
			<h1>QualityHub</h1>
			<h2>Welcome!</h2>
			<br />
			{/* Insert Google Login Button Here */}
			{/* <h2 className="sign-up-or">
        <span>OR</span>
      </h2> */}
			<form onSubmit={handleSubmit}>
				<div className='input-label'>
					<label htmlFor='sign-up-email'>Email</label>
					<br />
					<input
						onBlur={() => setEmailTouched(true)}
						id='sign-up-email'
						name='email'
						type='email'
						placeholder='Email'
						value={user.email}
						onChange={handleChange}
						required
					/>
				</div>
				<br />
				<div className='input-label'>
					<label htmlFor='password'> Password </label>
					<br />
					<input
						onBlur={() => setPasswordTouched(true)}
						id='sign-up-password'
						type='password'
						name='password'
						placeholder='Password'
						value={user.password}
						onChange={handleChange}
						required
					/>
				</div>
				{error && <p className='email-address-taken'>{error}</p>}
				<br />
				{!loading &&
					(user.email !== '' &&
					user.password !== '' &&
					user.password.length >= 6 ? (
						<button className='submit-btn sign-up-button'>Sign Up</button>
					) : (
						<button className='submit-btn sign-up-button' disabled>
							Sign Up
						</button>
					))}

				{!loading && (
					<p>
						Already have an account? <Link to='/signin'>Sign In</Link>
					</p>
				)}
				{loading && <Loading />}
			</form>
		</div>
	);
}
