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

// GraphQL Query to get posts to update cache
export const GET_POSTS = gql`
	query {
		posts {
			id
		}
	}
`;

// GraphQL Mutation to delete post associated with user
export const DELETE_POST = gql`
	mutation {
		deletePost {
			id
		}
	}
`;

export default function DeletePost({ isShowing, hide }) {
	const history = useHistory();
	const [deleteCoachPost] = useMutation(DELETE_POST, {
		update(cache, { data }) {
			const { posts } = cache.readQuery({ query: GET_POSTS });
			cache.writeQuery({
				query: GET_POSTS,
				data: { posts: posts.filter(post => post.id !== data.deletePost.id) },
			});
		},
	});

	const deletePost = () => {
		deleteCoachPost().then(res => {
			history.push('/dashboard');
		});
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
