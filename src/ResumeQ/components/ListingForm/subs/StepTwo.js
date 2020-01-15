import React from 'react';

const StepTwo = ({ formState, handleChange, setFormState }) => {
	return (
		<>
			<p className='add-listing-form-step-title'>STEP 2</p>
			<p className='add-listing-form-sub-title'>
				Rate Per Review<span className='red-span'>*</span>
			</p>
			<p className='add-listing-form-description'>
				Please set a price to charge per review.
			</p>
			<div className='slider'>
				<div className='slider-inner-boxes'>
					<div className='slider-dollar-amounts'>
						<p>$0</p>
						<p>$200</p>
					</div>
					<input
						id='listing-form-price-slider'
						name='price-slider'
						type='range'
						min='0'
						max='200'
						// If we allowed the text-input for price to go higher than 200, the price slider will bump to 200 till the price drops below
						value={formState.price <= 200 ? formState.price : 200}
						onChange={e => handleChange(e, setFormState, formState)}
						step='1'
					/>
				</div>
			</div>
			<div className='add-listing-form-range-input'>
				<input
					type='text'
					name='price'
					placeholder='$'
					value={`$${formState.price}`}
					onChange={e => handleChange(e, setFormState, formState)}
				/>
			</div>
			<hr className='add-listing-form-hr-1' />
		</>
	);
};

export default StepTwo;
