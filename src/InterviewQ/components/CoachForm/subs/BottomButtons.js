import React from "react";

const BottomButtons = ({
  handleSave,
  handleSubmit,
  formState,
  setDone,
  setOpen,
  addPost,
  closeWindow,
  requiredState,
  setRequiredState
}) => {
  function requiredMet(e) {
    formState.company.length === 0 ||
    formState.position.length === 0 ||
    formState.description.length === 0
      ? setRequiredState({ ...requiredState, any: true })
      : handleSubmit(e, formState, setDone, setOpen, addPost);

    // Upon clicking the publish button for a coach listing, the entire page will refresh. This allows the settings button in the LeftNav of the /interviewq route to appear.
    // In a future feature, Auth0 will be implemented and some state management overhauling will be done, so this page refresh will be removed and the re-rendering of the settings button will be controlled by state
    // window.location.reload();
  }

  return (
    <div>
      <div className="add-coach-form-bottom-buttons">
        <button
          className="add-coach-form-save-and-exit"
          onClick={e => handleSave(e, formState, closeWindow, addPost)}
        >
          Save and exit
        </button>
        <button className="add-coach-form-publish" onClick={requiredMet}>
          Publish
        </button>
      </div>
      {requiredState.any && (
        <p className="missing-required-fields">Missing required fields</p>
      )}
    </div>
  );
};

export default BottomButtons;
