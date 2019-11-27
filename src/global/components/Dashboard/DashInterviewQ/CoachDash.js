// Libraries
import React from 'react';

// Styles
import './CoachDash.scss';

// Components
import EditPost from './EditPost';
import DeletePost from './DeletePost';

// Hooks
import useModal from '../../../../utils/useModal';

export default function CoachDash() {
	const { isShowing, toggle } = useModal();

	return (
		<div>
			<h2>InterviewQ Coach Post</h2>
			<EditPost />
			<button className='delete-post-btn' onClick={toggle}>
				Delete Post
			</button>
			<DeletePost isShowing={isShowing} hide={toggle} />
		</div>
	);
}
