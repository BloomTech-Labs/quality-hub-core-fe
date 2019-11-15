import React from 'react';
import './SignUpForm.scss';

export default function GetStarted({ setProgress }) {
	const handleClick = () => {
		setProgress(1);
	};

	return (
		<div className='getstarted'>
			<div>
				<h1>Welcome to QualityHub!</h1>
				<h2>We have a couple of questions for you to fill in!</h2>
			</div>
			<button className='submit-btn begin-btn' onClick={handleClick}>
				Begin
			</button>
		</div>
	);
}
