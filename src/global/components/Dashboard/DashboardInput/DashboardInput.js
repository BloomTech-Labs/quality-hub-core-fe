// Libraries
import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';

// Styles & Icons
import './DashboardInput.scss';
import Icon from '../../../../globalIcons/Icon';
import { ICONS } from '../../../../globalIcons/iconConstants';

//GraphQuail Mutation
import { EDIT_USER } from './Mutation';

// Functions & Utils
import { capitalize } from '../../../../utils/capitalize';

// Data
import { statesArray } from '../../../../Core/components/SignUpForm/States';

const DashboardInput = ({ userKey, userValue }) => {
	const [original, setOriginal] = useState(userValue);
	const [editing, setEditing] = useState(false);
	const [user, setUser] = useState({
		[userKey]: userValue,
	});

	//changeField runs the update mutation
	const [changeField, changeFieldMutation] = useMutation(EDIT_USER);

	const handleChange = e => {
		setUser({
			[userKey]: e.target.value,
		});
	};

	const handleSubmit = e => {
		e.preventDefault();

		//this checks to see if the user pressed accept, but didn't make any changes.
		//if so, no mutation request is made
		if (original === user[userKey]) {
			setEditing(false);
			return;
		}

		//check if valid email
		const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if (userKey === 'email') {
			if (!user[userKey].match(mailFormat)) {
				setUser({
					[userKey]: original,
				});
				setEditing(false);
				return;
			}
		}

		//Cannot leave state on Select
		if (userKey === 'state') {
			if (user[userKey] === 'Select') {
				setUser({
					[userKey]: original,
				});
				setEditing(false);
				return;
			}
		}

		//this makes sure any required fields are not submitted as blank strings
		if (
			(userKey === 'first_name' ||
				userKey === 'last_name' ||
				userKey === 'email' ||
				userKey === 'city' ||
				userKey === 'state') &&
			user[userKey] !== ''
		) {
			//if fields are not blank, run mutation to update
			changeField({ variables: user })
				.then(res => {
					setOriginal(user[userKey]);
					setEditing(false);
				})
				.catch(err => {
					console.log(err);
				});
		} else if (
			!(
				userKey === 'first_name' ||
				userKey === 'last_name' ||
				userKey === 'email' ||
				userKey === 'city' ||
				userKey === 'state'
			)
		) {
			//if fields are not blank, run mutation to update
			changeField({ variables: user })
				.then(res => {
					setOriginal(user[userKey]);
					setEditing(false);
				})
				.catch(err => {
					console.log(err);
				});
		} else {
			//If fields are blank... cancel edit
			setUser({
				[userKey]: original,
			});
			setEditing(false);
		}
	};

	//if you cancel out of an edit, revert back to the original data
	const handleCancel = () => {
		setUser({
			[userKey]: original,
		});
		setEditing(false);
	};

	//when you click edit...
	//if the key name is state, use a dropdown menu instead of input form
	const checkKeyNameForEdit = () => {
		if (userKey === 'state') {
			return (
				<select
					id='sign-up-state'
					name='state'
					placeholder='State'
					value={user[userKey]}
					onChange={handleChange}
					required>
					<option>Select</option>
					{statesArray.map(state => (
						<option value={state} key={state}>
							{state}
						</option>
					))}
				</select>
			);
		}

		return (
			//If it's not a states array, just render a normal input field
			<input
				name={userKey}
				// placeholder={original}
				onChange={handleChange}
				value={user[userKey]}
			/>
		);
	};

	return (
		<div className='dash-input'>
			<div className='dash-row'>
				<span className='dash-heading'>
					<h3>{userKey && capitalize(userKey)}</h3>
				</span>
				<div>
					{editing ? (
						checkKeyNameForEdit() //when you click edit, check what kind of input field to return based on key name
					) : (
						<p>{user[userKey]}</p> //When you're not in edit mode, render this
					)}
				</div>
			</div>
			<div className='update-btns'>
				{editing && (
					// Cancel out of editing mode
					<button onClick={() => handleCancel()} className='cancel-button'>
						Cancel
					</button>
				)}
				{editing && (
					// Save changes made in editing mode
					<button onClick={e => handleSubmit(e)} className='accept-button'>
						Save
					</button>
				)}
			</div>
			{!editing && (
				//button to click on to enter editing mode
				<button
					className='edit-button'
					onClick={() => setEditing(true)}
					data-testid='edit-button' //data-testid made explicitly for testing-purposes
				>
					Edit
					{/* <Icon icon={ICONS.PENCIL} width={24} height={24} /> */}
				</button>
			)}
		</div>
	);
};

export default DashboardInput;
