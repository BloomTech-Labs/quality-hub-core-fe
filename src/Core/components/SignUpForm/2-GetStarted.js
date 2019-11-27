import React from 'react';
import './SignUpForm.scss';

export default function GetStarted({ setProgress }) {
	const handleClick = () => {
		setProgress(1);
	};

	return (
		<div className='getstarted'>
			<p className='getstarted-txt'>
				We have a couple questions for you to fill in to complete your profile!
			</p>
			<button className='begin-btn' onClick={handleClick}>
				Begin
			</button>
		</div>
	);
}
