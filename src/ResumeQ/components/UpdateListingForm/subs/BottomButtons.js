import React from 'react';

const BottomButtons = ({ hasListing, setHasListing, handleSave, handleSubmit, formState, setDone, setOpen, updateListing, closeWindow, requiredState, setRequiredState }) => {

	function requiredMet(e) {
		(formState.company.length === 0 || formState.position.length === 0 || formState.description.length === 0) ? setRequiredState({...requiredState, any: true}) : handleSubmit(e, formState, setDone, setOpen, updateListing)
	}

	return (
		<div>
			<div className="add-listing-form-bottom-buttons">
				<button
					className="add-listing-form-save-and-exit"
					onClick={e => handleSave(e, formState, closeWindow, updateListing)}>
					Save and exit
				</button>
				<button className="add-listing-form-publish" onClick={requiredMet}>
					Publish
				</button>
			</div>
			{requiredState.any && <p className="missing-required-fields">Missing required fields</p>}
		</div>

	);
};

export default BottomButtons;
