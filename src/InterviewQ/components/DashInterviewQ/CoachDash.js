// Libraries
import React from 'react';

// Icons
import Icon from '../../../globalIcons/Icon';
import { ICONS } from '../../../globalIcons/iconConstants';

// Styles
import './CoachDash.scss';

// Components
import EditPost from './EditPost';
import DeletePost from './DeletePost';
// import Review from '../Review/ReviewForm';

// Hooks
import useModal from '../../../utils/useModal';
import Availability from './Availability/Availability';
// import { useQuery } from '@apollo/react-hooks';
// import { GET_COACH_POST } from './Resolvers.js';

export default function CoachDash() {
	const { isShowing, toggle } = useModal();

	// const { data: coachPost } = useQuery(GET_COACH_POST, {
	// 	variables: { coach_id: localStorage.getItem('id') },
	// });
	// console.log(coachPost);

	return (
		<div className='dash-coachinfo'>
			<div className='coachinfo-header'>
				<div className='circle-blue'>
					<Icon icon={ICONS.COACHINFO} width={26} height={28} color='white' />
				</div>
				<h1>Coach Info</h1>
			</div>

			<EditPost/>
			<Review />

			<div className='editform'>
				<h2>Delete Coach Post</h2>
				<div className='delete-post'>
					<span className='delete-warning'>
						<p>If you delete your post, you can't reverse this action</p>
					</span>
					<button className='delete-post-btn' onClick={toggle}>
						<p>Delete Post</p>
					</button>
				</div>
			</div>
			<DeletePost isShowing={isShowing} hide={toggle} />
		</div>
	);
}
