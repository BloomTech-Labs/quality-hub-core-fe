import React, { useState } from 'react';
import { GET_INDUSTRIES, UPDATE_POST } from './Resolvers.js';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { capitalize } from '../../../../utils/capitalize';

const PostInput = ({ postKey, postValue, originalPost }) => {

console.log(originalPost.postByCoach.id)

	const [original, setOriginal] = useState(postValue);
	const [editing, setEditing] = useState(false);
	const [post, setpost] = useState({
		[postKey]: postValue,
	});
console.log(original)
	//changeField runs the update mutation
	const [changeField, changeFieldMutation] = useMutation(UPDATE_POST);

	const handleChange = e => {
		setpost({
    id: originalPost.postByCoach.id,
			[postKey]: e.target.value,
		});
	};

	const handleSubmit = e => {
		e.preventDefault();

		//this checks to see if the user pressed accept, but didn't make any changes.
		//if so, no mutation request is made
		if (original === post[postKey]) {
			setEditing(false);
			return;
		}


		//Cannot leave state on Select
		if (postKey === 'industryName') {
			if (post[postKey] === 'Select') {
				setpost({
					[postKey]: original,
				});
				setEditing(false);
				return;
			}
		}

		//this makes sure any required fields are not submitted as blank strings
		if (
      (postKey === 'price' ||
      // postKey === 'company' ||
				postKey === 'industryName' ||
				postKey === 'description' ||
				postKey === 'tagString' ||
				postKey === 'postition') &&
			post[postKey] !== ''
		) {
			//if fields are not blank, run mutation to update
			changeField({ variables: post })
				.then(res => {
					setOriginal(post[postKey]);
					setEditing(false);
				})
				.catch(err => {
					console.log(err);
				});
		} else if (
			!(
				postKey === 'price' ||
      // postKey === 'company' ||
				postKey === 'industryName' ||
				postKey === 'description' ||
				postKey === 'tagString' ||
				postKey === 'postition'
			)
		) {
			//if fields are not blank, run mutation to update
			changeField({ variables: post })
				.then(res => {
					setOriginal(post[postKey]);
					setEditing(false);
				})
				.catch(err => {
					console.log(err);
				});
		} else {
			//If fields are blank... cancel edit
			setpost({
				[postKey]: original,
			});
			setEditing(false);
		}
	};

	//if you cancel out of an edit, revert back to the original data
	const handleCancel = () => {
		setpost({
			[postKey]: original,
		});
		setEditing(false);
	};

  //Gets industries and puts them in an array
  const { data: industries } = useQuery(GET_INDUSTRIES);
  console.log(industries ) 
	//when you click edit...
	//if the key name is state, use a dropdown menu instead of input form
	const checkKeyNameForEdit = () => {
    console.log('check', postKey)
		if (postKey === 'industry') {
			return (
				<select
					name='industryName'
					value={post[postKey]}
					onChange={handleChange}
					required>
					<option>Select</option>
					{industries && industries.map(industry => (
            
						<option value={industry.name} key={industry.id}>
              
							{industry.name}
						</option>
					))}
				</select>
			);
		}

		return (
			//If it's not a states array, just render a normal input field
			<input
				name={postKey}
				// placeholder={original}
				onChange={handleChange}
				value={post[postKey]}
			/>
		);
	};

	return (
		<div className='dash-input'>
			<div className='dash-row'>
				<span className='dash-heading'>
					<h3>{postKey && capitalize(postKey)}</h3>
				</span>
				<div>
					{editing ? (
						checkKeyNameForEdit() //when you click edit, check what kind of input field to return based on key name
					) : (
						<p>{post[postKey]}</p> //When you're not in edit mode, render this
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

export default PostInput;
