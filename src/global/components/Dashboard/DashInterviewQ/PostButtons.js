import React, { useEffect, useState } from 'react';
import { GET_INDUSTRIES, UPDATE_POST } from './Resolvers.js';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { capitalize } from '../../../../utils/capitalize';

const PostButtons = ({ editing, setEditing, handleCancel, handleSubmit, index }) => {

  // const [changeField] = useMutation(UPDATE_POST);
  // const [index, set]

	const [focusvar, setFocusvar] = useState(false);
const handleEdit = () =>{
  // console.log('running', editing)
  let newArr = [];
  newArr= [...editing];
  newArr[index] = true;
	setEditing(newArr)
	setFocusvar(!focusvar);
	// document.getElementsById(`edit-post-${index}`).focus();
}

useEffect(() => {
   if (editing[index]) {
  //   document.querySelector('input').focus();
	// }
	document.getElementById(`edit-post-${index}`).focus();
	console.log('a word', index);
	 }
}, [focusvar]);

// console.log(editing);

	return (

    <>
			<div className='edit-btn'>
				{editing[index] && (
					// Cancel out of editing mode
					<button onClick={() => handleCancel(index)} className='cancel-button'>
						Cancel
					</button>
				)}
				{editing[index] && (
					// Save changes made in editing mode
					<button onClick={e => handleSubmit(e, index)} className='accept-button'>
						Save
					</button>
				)}
			</div>
			{!editing[index] && (
				//button to click on to enter editing mode
				<button
					className='edit-button'
					onClick={handleEdit}
					data-testid='edit-button' //data-testid made explicitly for testing-purposes
				>
					Edit
				</button>
			)}
		</>
	);
};

export default PostButtons;