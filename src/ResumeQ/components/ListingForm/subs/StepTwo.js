import React from 'react';

const StepTwo = ({ formState, handleChange, setFormState }) => {
	return (
		<>
			<p className='RQadd-listing-form-step-title'>STEP 2</p>
			<p className='RQadd-listing-form-sub-title'>
				Rate Per Review<span className='red-span'>*</span>
			</p>
			<p className='RQadd-listing-form-description'>
				Please set a price to charge per review.
			</p>
			<div className='RQslider'>
				<div className='RQslider-inner-boxes'>
					<div className='RQslider-dollar-amounts'>
						<p>$0</p>
						<p>$200</p>
					</div>
					<input
						id='RQlisting-form-price-slider'
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
			<div className='RQadd-listing-form-range-input'>
				<input
					type='text'
					name='price'
					placeholder='$'
					value={`$${formState.price}`}
					onChange={e => handleChange(e, setFormState, formState)}
				/>
			</div>
			<hr className='RQadd-listing-form-hr-1' />
		</>
	);
};

export default StepTwo;
