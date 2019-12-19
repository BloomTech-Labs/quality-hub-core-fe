import React, { useState } from 'react';
import CoachPreview from '../../../LandingPage/CoachList/subs/2_CoachCardModal/CoachCardExpand'

const CoachPreviewModal = ({ post }) => {
	const [open, setOpen] = useState(false);

	return (
    <div className='see-preview'>
      <div className='coach-card-modal-text'>
        <button className='see-preview-btn' onClick={() => setOpen(!open)}>
          <p className='coach-card-modal-text coachcard-seemore'>See preview </p>
        </button>
        {open && <CoachPreview setOpen={setOpen} open={open} post={post} />}
      </div>
    </div>
	);
};

export default CoachPreviewModal;
