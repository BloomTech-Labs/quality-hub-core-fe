import React from 'react';

const TopText = ({ lightbulb }) => {
	return (
		<div className='add-listing-form-top-fixed'>
			<div className='add-listing-form-row-1'>
				<div>{lightbulb()}</div>{' '}
				<div className='add-listing-form-header'>
					Create your listing posting here!
				</div>
			</div>
			<p className='add-listing-form-row-2'>
				Please fill the following fields to be listed as a listing on InterviewQ.
				<br />
				This information will help seekers decide which listinges to select, so be
				sure to sell yourself well!
			</p>
		</div>
	);
};

export default TopText;
