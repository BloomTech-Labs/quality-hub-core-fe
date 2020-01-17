import React from 'react';

const TopText = ({ lightbulbRQ }) => {
	return (
		<div className='RQadd-listing-form-top-fixed'>
			<div className='RQadd-listing-form-row-1'>
				<div>{lightbulbRQ()}</div>{' '}
				<div className='RQadd-listing-form-header'>
					Create your listing here!
				</div>
			</div>
			<p className='RQadd-listing-form-row-2'>
				Please fill the following fields to create a listing on the ResumeQ marketplace.
				<br />
				This information will help seekers decide which listing to select, so be
				sure to sell yourself well!
			</p>
		</div>
	);
};

export default TopText;
