import React, { useState } from 'react';
import CoachPreview from './CoachDashCardExpand.js';

//Styles
import '../CoachList/CoachCardModal.scss';
// import Icon from '../../../globalIcons/Icon';
// import { ICONS } from '../../../globalIcons/iconConstants';

const CoachPreviewModal = ({ post }) => {
	const [open, setOpen] = useState(false);



	return (
		<div className='coach-card-modal-text'>
		
			<button className='update-post-btn' onClick={() => setOpen(!open)}>
				<p className='coach-card-modal-text coachcard-seemore'>See preview </p>
			</button>
			{open && <CoachPreview setOpen={setOpen} open={open} post={post} />}
		</div>
	);
};

export default CoachPreviewModal;