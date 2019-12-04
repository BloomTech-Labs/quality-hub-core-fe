// Libraries
import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';

// Styles
import './SignUpForm.scss';

// Components
import ProgressBar from './ProgressBar';
import InitialSignUp from './1-InitialSignUp';
import GetStarted from './2-GetStarted';
import SignUpNav from './SignUpNav';
import GeneralSignUp from './3-GeneralSignUp';
import ExpSignUp from './4-ExpSignUp';
import CompletedSignUp from './5-CompletedSignUp';

// Mutation
import { SIGN_UP } from './Mutation';

// User Schema
import { userSchema } from './UserSchema';

//COM-ponent
const SignUpForm = props => {
	const [emailTouched, setEmailTouched] = useState(false);
	const [firstTouched, setFirstTouched] = useState(false);
	const [lastTouched, setLastTouched] = useState(false);
	const [cityTouched, setCityTouched] = useState(false);
	const [stateTouched, setStateTouched] = useState(false);
	const [passwordTouched, setPasswordTouched] = useState(false);

	//Set user object
	const [user, setUser] = useState({
		first_name: '',
		last_name: '',
		email: '',
		password: '',
		city: '',
		state: '',
		bio: '',
		personal_url: 'http://',
		portfolio_url: 'http://',
		twitter_url: 'http://',
		linkedin_url: 'http://',
		github_url: 'http://',
	});

	const [signup, error] = useMutation(SIGN_UP);
	const [valError, setValError] = useState();

	//Form management/validation
	useEffect(() => {
		validateUser();
	}, [user]);

	const validateUser = () => {
		userSchema
			.validate(user, { abortEarly: false })
			.then(res => {
				setValError();
			})
			.catch(err => {
				setValError(err.errors);
			});
	};

	const handleChange = e => {
		console.log(e.target.value);
		setUser({
			...user,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = e => {
		e.preventDefault();

		//if URL is left as default, just remove http:// and submit as empty string
		const urlArray = [
			'personal_url',
			'portfolio_url',
			'twitter_url',
			'linkedin_url',
			'github_url',
		];

		let submitUser = { ...user };

		urlArray.forEach(item => {
			if (submitUser[item] === 'http://') {
				submitUser[item] = '';
			}
		});

		//Isn't this redundant? You would not be able to submit if it was already validated, right?
		validateUser();

		signup({ variables: submitUser })
			.then(results => {
				// console.log(results);
				let token = results.data.signup.token;
				localStorage.setItem('token', token); //Should probably also set id to localStorage
				localStorage.setItem('id', results.data.signup.user.id);
				setProgress(progress + 1);
				setTimeout(() => {
					props.history.push('/dashboard');
				}, 3000);
			})
			.catch(err => {
				console.log(err);
			});
	};

	//Set form step
	const [progress, setProgress] = useState(-1);

	const handleNext = e => {
		e.preventDefault();
		setProgress(progress + 1);
	};

	const handleBack = e => {
		e.preventDefault();
		setProgress(progress - 1);
	};

	return (
		<div>
			{progress === -1 && (
				<InitialSignUp
					user={user}
					setUser={setUser}
					setProgress={setProgress}
					setEmailTouched={setEmailTouched}
					setPasswordTouched={setPasswordTouched}
				/>
			)}
			{progress === -1 && valError
				? valError.map(message => {
						if (message.includes('email') && !emailTouched) {
							return null;
						}
						if (message.includes('first') && !firstTouched) {
							return null;
						}
						if (message.includes('last') && !lastTouched) {
							return null;
						}
						if (message.includes('city') && !cityTouched) {
							return null;
						}
						if (message.includes('state') && !stateTouched) {
							return null;
						}
						if (
							(message.includes('password') || message.includes('Password')) &&
							!passwordTouched
						) {
							return null;
						}

						return (
							<p key={message} className='validation-error-message'>
								{message}
							</p>
						);
				  })
				: null}

			{progress === 0 && <GetStarted setProgress={setProgress} />}

			{progress > 0 && (
				<div className='sign-up-form'>
					{/* <h2>Sign Up</h2> */}
					<ProgressBar progress={progress} />

					<form>
						{/* <form onSubmit={handleSubmit}> */}
						{(function() {
							switch (progress) {
								case 1:
									return (
										<>
											<GeneralSignUp
												// setEmailTouched={setEmailTouched}
												setFirstTouched={setFirstTouched}
												setLastTouched={setLastTouched}
												setCityTouched={setCityTouched}
												setStateTouched={setStateTouched}
												// setPasswordTouched={setPasswordTouched}
												user={user}
												handleChange={handleChange}
											/>
											{/* {valError ? (
												<button className='form-btn' disabled>
													Next
												</button>
											) : (
												<button className='form-btn' onClick={handleNext}>
													Next
												</button>
											)} */}
											<SignUpNav
												handleBack={handleBack}
												handleNext={handleNext}
											/>
											{valError
												? valError.map(message => {
														// if (message.includes('email') && !emailTouched) {
														// 	return null;
														// }
														if (message.includes('first') && !firstTouched) {
															return null;
														}
														if (message.includes('last') && !lastTouched) {
															return null;
														}
														if (message.includes('city') && !cityTouched) {
															return null;
														}
														if (message.includes('state') && !stateTouched) {
															return null;
														}
														// if (
														// 	(message.includes('password') ||
														// 		message.includes('Password')) &&
														// 	!passwordTouched
														// ) {
														// 	return null;
														// }

														return (
															<p
																key={message}
																className='validation-error-message'>
																{message}
															</p>
														);
												  })
												: null}
										</>
									);
								case 2:
									return (
										<>
											<ExpSignUp user={user} handleChange={handleChange} />
											{/* <button className='form-btn' onClick={handleBack}>
												Back
											</button>
											<button className='submit-btn' type='submit'>
												Submit
											</button> */}
											<SignUpNav
												handleBack={handleBack}
												handleNext={handleSubmit}
											/>
											{error.error ? (
												<p>
													This email address is already in use- please enter a
													unique email address
												</p>
											) : null}
										</>
									);
								case 3:
									return <CompletedSignUp />;
								default:
									return;
							}
						})()}

						<br />
					</form>
				</div>
			)}
		</div>
	);
};

export default SignUpForm;
