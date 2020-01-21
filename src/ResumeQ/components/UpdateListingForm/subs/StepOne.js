import React, { useState } from 'react';

const StepOne = ({ formState, handleChange, industriesData, setFormState, requiredState, setRequiredState }) => {



	function displayRequired(e) {
		return (e.target.value.length === 0) ? setRequiredState({ ...requiredState, [e.target.name]: true }) : setRequiredState({ ...requiredState, [e.target.name]: false })
	}

	return (
		<>
			<p className='RQadd-listing-form-sub-title'>Profile</p>
			<p className='RQadd-listing-form-description'>
				Please tell us about your career so far and your accomplishments.
			</p>
			<p className='RQadd-listing-form-row-6'>
				Company <span className='red-span'>*</span>
			</p>
			<input
				className='RQadd-listing-form-row-7'
				type='text'
				name='company'
				placeholder='e.g Google, Facebook...'
				value={formState.company}
				onChange={(e) => handleChange(e, setFormState, formState)}
				onBlur={displayRequired}
			/>
			{requiredState.company && <p>Field is required</p>}

			<p className='RQadd-listing-form-row-6'>
				Position <span className='red-span'>*</span>
			</p>
			<input
				className='RQadd-listing-form-row-7'
				type='text'
				name='position'
				placeholder='e.g UX Designer, Software Engineer...'
				value={formState.position}
				onChange={(e) => handleChange(e, setFormState, formState)}
				onBlur={displayRequired}
			/>
			{requiredState.position && <p>Field is required</p>}


			<p className='RQadd-listing-form-row-6'>
				Description <span className='red-span'>*</span>
			</p>
			<textarea
				className='RQadd-listing-form-row-7'
				type='text'
				name='description'
				placeholder='eg. I am a software developer at Google with 12 years of experience under my belt...'
				value={formState.description}
				onChange={(e) => handleChange(e, setFormState, formState)}
				onBlur={displayRequired}
			/>
			{requiredState.description && <p>Field is required</p>}


			<hr className='RQadd-listing-form-hr-1' />
		</>
	);
};

export default StepOne;
