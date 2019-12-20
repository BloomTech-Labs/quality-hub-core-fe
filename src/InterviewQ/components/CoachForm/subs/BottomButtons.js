import React from 'react';

const BottomButtons = ({ handleSave, handleSubmit, formState, setDone, setOpen, addPost, closeWindow, requiredState }) => {

	function requiredMet(e) {
		!requiredState.company && !requiredState.position && !requiredState.description ? handleSubmit(e, formState, setDone, setOpen, addPost) : alert("Missing required fields")
	}

	return (
		<div className="add-coach-form-bottom-buttons">
			<button
				className="add-coach-form-save-and-exit"
				onClick={e => handleSave(e, formState, closeWindow, addPost)}>
				Save and exit
			</button>
			<button className="add-coach-form-publish" onClick={requiredMet}>
				Publish
			</button>
		</div>
	);
};

export default BottomButtons;
