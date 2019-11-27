// Libraries
import React from 'react';
import { createPortal } from 'react-dom';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';

// Styles & Icons
import './DeletePost.scss';
import Icon from '../../../../globalIcons/Icon';
import { ICONS } from '../../../../globalIcons/iconConstants';

// GraphQL Mutation
export const DELETE_POST = gql`
	mutation DeletePost($postId: String!) {
		deletePost(id: $postId) {
			id
		}
	}
`;

export default function DeletePost({ isShowing, hide }) {
	const [deletePostMutation] = useMutation(DELETE_POST);
	const history = useHistory();

	const deletePost = () => {
		// deletePostMutation().then(res => {
		// 	history.pushState('/dashboard');
		// });
		history.push('/dashboard');
	};

	return (
		<div>
			{isShowing &&
				createPortal(
					<div className='modal-container'>
						<div className='modal-wrapper' aria-modal aria-hidden role='dialog'>
							<div className='modal-header'>
								<Icon
									icon={ICONS.QUESTIONMARK}
									width={24}
									height={24}
									color='#FAAD14'
								/>
								<h2> Do you want to delete your InterviewQ coach post?</h2>
							</div>
							<p>
								Deleting your post will remove all of the contents of the post.
							</p>
							<div className='modal-button-cont'>
								<button className='cancel' onClick={hide}>
									Cancel
								</button>
								<button className='ok-button' onClick={deletePost}>
									OK
								</button>
							</div>
						</div>
					</div>,
					document.body,
				)}
		</div>
	);
}
