import React from 'react';

const BottomButtons = ({ hasListing, setHasListing, handleSave, handleSubmit, formState, setDone, setOpen, createListing, closeWindow, requiredState, setRequiredState }) => {

	function requiredMet(e) {
		(formState.company.length === 0 || formState.position.length === 0 || formState.description.length === 0) ? setRequiredState({...requiredState, any: true}) : handleSubmit(e, formState, setDone, setOpen, createListing)
	}

	return (
		<div>
			<div className="RQadd-listing-form-bottom-buttons">
				<button
					className="RQadd-listing-form-save-and-exit"
					onClick={e => handleSave(e, formState, closeWindow, createListing)}>
					Save and exit
				</button>
				<button className="RQadd-listing-form-publish" onClick={requiredMet}>
					Publish
				</button>
			</div>
			{requiredState.any && <p className="RQmissing-required-fields">Missing required fields</p>}
		</div>

	);
};

export default BottomButtons;
