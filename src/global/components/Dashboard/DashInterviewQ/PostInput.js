import React, { useState } from 'react';
import { GET_INDUSTRIES, UPDATE_POST } from './Resolvers.js';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { capitalize } from '../../../../utils/capitalize';

const PostInput = ({ editing, setEditing, handleCancel, handleSubmit, index }) => {

  // const [changeField] = useMutation(UPDATE_POST);
  // const [index, set]

const handleEdit = () =>{
  // console.log('running', editing)
  let newArr = [];
  newArr= [...editing];
  newArr[index] = true;
  setEditing(newArr)
}


// console.log(editing);

	return (

    <>
			<div className='edit-btn'>
				{editing[index] && (
					// Cancel out of editing mode
					<button onClick={() => handleCancel()} className='cancel-button'>
						Cancel
					</button>
				)}
				{editing[index] && (
					// Save changes made in editing mode
					<button onClick={e => handleSubmit(e)} className='accept-button'>
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

export default PostInput;