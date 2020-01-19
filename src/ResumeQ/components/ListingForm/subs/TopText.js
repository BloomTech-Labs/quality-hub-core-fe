import React from 'react';

const TopText = ({ lightbulb }) => {
	return (
		<div className='add-listing-form-top-fixed'>
			<div className='add-listing-form-row-1'>
				<div>{lightbulb()}</div>{' '}
				<div className='add-listing-form-header'>
					Create your listing here!
				</div>
			</div>
			<p className='add-listing-form-row-2'>
				Please fill the following fields to create a listing on the ResumeQ marketplace.
				<br />
				This information will help seekers decide which listing to select, so be
				sure to sell yourself well!
			</p>
		</div>
	);
};

export default TopText;
