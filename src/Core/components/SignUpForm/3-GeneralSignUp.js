import React from 'react';
import { statesArray } from './States';

const GeneralSignUp = ({
	user,
	handleChange,
	// setEmailTouched,
	setFirstTouched,
	setLastTouched,
	setCityTouched,
	// setPasswordTouched,
	setStateTouched,
}) => {
	return (
		<div className='general-sign-up'>
			<div className='two-inputs'>
				<div className='input-label'>
					<label htmlFor='sign-up-first-name'>First Name*</label>
					<br />
					<input
						onBlur={() => setFirstTouched(true)}
						id='sign-up-first-name'
						name='first_name'
						placeholder='First Name'
						value={user.first_name}
						onChange={handleChange}
						required
					/>
				</div>
				<br />

				<div className='input-label'>
					<label htmlFor='sign-up-first-name'>Last Name*</label>
					<br />
					<input
						onBlur={() => setLastTouched(true)}
						id='sign-up-last-name'
						name='last_name'
						placeholder='Last Name'
						value={user.last_name}
						onChange={handleChange}
						required
					/>
				</div>
			</div>
			<br />
			{/* <div className="input-label">
          <label htmlFor="sign-up-password">Password*</label>
          <br />
          <input
          onBlur={()=>setPasswordTouched(true)}
            id="sign-up-password"
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
            required
          />
        </div>
        <br />
        <div className="input-label">
          <label htmlFor="sign-up-email">Email*</label>
          <br />
          <input
          onBlur={()=>setEmailTouched(true)}
            id="sign-up-email"
            name="email"
            type="email"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>
        <br /> */}

			<div className='two-inputs'>
				<div className='input-label'>
					<label htmlFor='sign-up-city'>City*</label>
					<br />
					<input
						onBlur={() => setCityTouched(true)}
						id='sign-up-city'
						name='city'
						placeholder='City'
						value={user.city}
						onChange={handleChange}
						required
					/>
				</div>
				<br />

				<div className='input-label'>
					<label htmlFor='sign-up-state'>State/Territory*</label>
					<br />
					<select
						onBlur={() => setStateTouched(true)}
						id='sign-up-state'
						name='state'
						placeholder='State'
						value={user.state}
						onChange={handleChange}
						required>
						<option>Select</option>
						{statesArray.map(state => (
							<option value={state} key={state}>
								{state}
							</option>
						))}
					</select>
				</div>
				
			</div>
			<div className='input-label'>
					<label htmlFor='sign-up-bio'>Bio</label>
					<br />
					<textarea className="bio-text" 
					name="bio"
					placeholder="Tell us about yourself" 
					value={user.bio}
					onChange={handleChange}/>
				</div>
		</div>
	);
};

export default GeneralSignUp;
