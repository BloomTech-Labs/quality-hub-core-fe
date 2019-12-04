// Libraries
import React from 'react';
import { useHistory } from 'react-router-dom';

// Styles
import './SignUpForm.scss';

const CompletedSignUp = () => {
	const history = useHistory();

	return (
		<div className='completed-signup'>
			<p>
				You're all done!
				<br />
				You can see your profile in dashboard.
			</p>
			{/* <img
				className='quail-walk'
				src='https://i.imgur.com/ABm9pT1.gif'
				alt='animation of quail walking'
			/> */}
			<button
				className='signup-btn gotit-btn'
				onClick={() => {
					history.push('/dashboard');
				}}>
				Got it
			</button>
		</div>
	);
};

export default CompletedSignUp;
