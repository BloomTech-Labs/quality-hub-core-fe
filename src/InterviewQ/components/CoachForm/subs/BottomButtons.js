import React from 'react';

const BottomButtons = ({ handleSave, handleSubmit }) => {
	return (
		<div className="add-coach-form-bottom-buttons">
			<button
				className="add-coach-form-save-and-exit"
				onClick={e => handleSave(e)}>
				Save and exit
			</button>
			<button className="add-coach-form-publish" onClick={e => handleSubmit(e)}>
				Publish
			</button>
		</div>
	);
};

export default BottomButtons;
