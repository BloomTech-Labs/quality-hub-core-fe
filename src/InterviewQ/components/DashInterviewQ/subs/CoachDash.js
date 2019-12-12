// Libraries
import React from 'react';

// Icons
import Icon from '../../../../global/icons/Icon';
import { ICONS } from '../../../../global/icons/iconConstants';

// Styles
import './CoachDash.scss';

// Components
import EditPost from './BasicInfo/00_EditPost';
import DeletePost from './DeletePost/00_DeletePost';
// import Review from '../Review/ReviewForm';

// Hooks
import useModal from '../../../../utils/useModal';

export default function CoachDash() {
	const { isShowing, toggle } = useModal();

	return (
		<div className='dash-coachinfo'>
			<div className='coachinfo-header'>
				<div className='circle-blue'>
					<Icon icon={ICONS.COACHINFO} width={26} height={28} color='white' />
				</div>
				<h1>Coach Info</h1>
			</div>

			<EditPost />
			{/* <Review /> */}

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
