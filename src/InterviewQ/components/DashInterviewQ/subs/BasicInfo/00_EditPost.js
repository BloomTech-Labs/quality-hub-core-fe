// Libraries
import React, { useState, useEffect } from 'react';

import { useQuery, useMutation } from '@apollo/react-hooks';
import PostButtons from './01_PostButtons';
import {
	GET_COACH_POST,
	GET_INDUSTRIES,
	UPDATE_POST,
	REMOVE_TAG,
} from '../Resolvers';
import PreviewCard from './02_CoachDashPreviewModal';
import Availability from '../Availability/00_Availability';

import './00_EditForm.scss';

const CoachBasicInfo = ({ myArray, userData, setOpen, open }) => {
	//GraphQL Queries/Mutations
	const { data: industries } = useQuery(GET_INDUSTRIES);
	const { loading, data: coachPost } = useQuery(GET_COACH_POST, {
		variables: { coach_id: localStorage.getItem('id') },
	});

	const [removeTag] = useMutation(REMOVE_TAG);
	const [changeField] = useMutation(UPDATE_POST);

	const [published, setPublished] = useState();
	const [editing, setEditing] = useState([
		false,
		false,
		false,
		false,
		false,
		false,
	]);
	const [post, setPost] = useState({
		id: coachPost.postByCoach.id,
		tagString: '',
	});
	const [deleteTags, setDelete] = useState([]);
	//Component State
	let coachObj = coachPost && coachPost.postByCoach;
	let tagArray =
		coachPost &&
		coachPost.postByCoach.tags.map(tag => (
			<button key={tag.id} className='tag-button'>
				{tag.name}
				<span
					className={editing[5] ? '' : 'hidden'}
					id={tag.id}
					onClick={handleTagRemove}>
					{' '}
					x{' '}
				</span>
			</button>
		));
	const [original, setOriginal] = useState(coachObj);

	useEffect(() => {
		if (coachPost) {
			setPublished(coachPost.postByCoach.isPublished) &&
				setOriginal({ ...coachPost['postByCoach'] });
		}
	}, [coachPost]);

	//Handler Functions
	const handleChange = e => {
		if (e.target.name === 'price') {
			if (/^\$[0-9]*$/gm.test(e.target.value)) {
				let newPrice = e.target.value.split('$');
				setPost({
					id: coachPost.postByCoach.id,
					[e.target.name]: parseInt(newPrice[1]),
				});
				return;
			} else {
				return;
			}
		}
		if (e.target.name === 'price-slider') {
			setPost({
				id: coachPost.postByCoach.id,
				price: parseInt(e.target.value),
			});
			return;
		} else {
			setPost({
				id: coachPost.postByCoach.id,
				[e.target.name]: e.target.value,
			});
		}
	};

	const handleCancel = index => {
		setPost({
			id: coachPost.postByCoach.id,
		});
		let newEditing = [...editing];
		newEditing[index] = false;
		setEditing(newEditing);
		if (index === 5) {
			setOriginal({ ...original, tags: coachPost.postByCoach.tags });
			setDelete([]);
		}
	};

	useEffect(() => {
		if (original.tagString) {
			let tags = original.tags;
			let newTags = tags.map(tag => (
				<button key={tag.id} className='tag-button'>
					{tag.name}
					<span
						className={editing[5] ? '' : 'hidden'}
						id={tag.id}
						onClick={handleTagRemove}>
						{' '}
						x{' '}
					</span>
				</button>
			));
			setOriginal({ ...original, tagString: newTags });
		}
		// eslint-disable-next-line
	}, [editing[5], original.tags]);

	const handleSubmit = (e, index) => {
		let keyval = Object.keys(post);
		e.preventDefault();
		console.log(post);
		deleteTags.forEach(tag => {
			removeTag({ variables: { id: post.id, tagID: tag.id } });
		});
		changeField({ variables: post })
			.then(res => {
				if (keyval[1] === 'tagString') {
					let tags = res.data.updatePost.tags;
					tags.map(tag => (
						<button key={tag.id} className='tag-button'>
							{tag.name}
							<span
								className={editing[5] ? '' : 'hidden'}
								id={tag.id}
								onClick={handleTagRemove}>
								{' '}
								x{' '}
							</span>
							}
						</button>
					));
					setOriginal({ ...original, tags: tags });
					setPost({ id: coachPost.postByCoach.id });
				} else {
					setOriginal({ ...original, [keyval[1]]: post[keyval[1]] });
				}
				let newEditing = [...editing];
				newEditing[index] = false;
				setEditing(newEditing);
			})
			.catch(err => {
				console.log(err);
			});
	};

	function handleTagRemove(e) {
		let tagID = e.target.id;
		let newArray = original.tags.filter(tag => tagID !== tag.id);
		let newNodes = tagArray.filter(tag => tag.key !== tagID);
		tagArray = newNodes;
		setOriginal({ ...original, tags: newArray, tagString: tagArray });
		setDelete(arr => [...arr, { id: tagID }]);
		console.log(deleteTags);
	}
	// const tagArray =
	// 	coachPost && coachPost.postByCoach.tags.map(tag => tag.name).join(', ');

	const handleSubmitPost = e => {
		e.preventDefault();
		changeField({ variables: { id: post.id, isPublished: true } })
			.then(res => {
				console.log(res.data.updatePost);
			})
			.catch(err => {
				console.log(err);
			});
	};

	const handleUnpublish = e => {
		e.preventDefault();
		changeField({ variables: { id: post.id, isPublished: false } })
			.then(res => {
				console.log(res.data.updatePost);
			})
			.catch(err => {
				console.log(err);
			});
	};

	return (
		<>
			<div className='IQ-editform'>
				{/* START BASIC INFO */}
				<h2>Basic Info</h2>
				<div className='IQ-dash-input'>
					<div className='IQ-dash-row post-row'>
						<span className='IQ-dash-heading'>
							<h4>COMPANY</h4>
						</span>
						{editing[0] ? (
							<div>
								<input
									id='edit-post-0'
									defaultValue={original && original.company}
									name='company'
									value={post.company}
									onChange={handleChange}
								/>
							</div>
						) : (
							<div>
								<p>{original && original.company}</p>
							</div>
						)}
					</div>
					<PostButtons
						index={0}
						editing={editing}
						setEditing={setEditing}
						handleCancel={handleCancel}
						handleSubmit={handleSubmit}
					/>
				</div>

				<div className='IQ-dash-input'>
					<div className='IQ-dash-row post-row'>
						<span className='IQ-dash-heading'>
							<h4>POSITION</h4>
						</span>
						{editing[1] ? (
							<div>
								<input
									id='edit-post-1'
									name='position'
									value={post.position}
									defaultValue={original && original.position}
									onChange={handleChange}
								/>
							</div>
						) : (
							<div>
								<p>{original && original.position}</p>
							</div>
						)}
					</div>
					<PostButtons
						index={1}
						editing={editing}
						setEditing={setEditing}
						handleCancel={handleCancel}
						handleSubmit={handleSubmit}
					/>
				</div>

				<div className='IQ-dash-input'>
					<div className='IQ-dash-row post-row'>
						<span className='IQ-dash-heading'>
							<h4>INDUSTRY</h4>
						</span>
						{editing[2] ? (
							<div>
								<select
									id='edit-post-2'
									name='industryName'
									value={post.industryName}
									onChange={handleChange}>
									<option>
										{' '}
										{original && original.industryName
											? original && original.industryName
											: original && original.industry.name}
									</option>
									{industries &&
										industries.industries.map(industry => (
											<option value={industry.name} key={industry.id}>
												{industry.name}
											</option>
										))}
								</select>
							</div>
						) : (
							<div>
								<p>
									{original && original.industryName
										? original && original.industryName
										: original && original.industry.name}
								</p>
							</div>
						)}
					</div>
					<div className='edit-btns'></div>
					<PostButtons
						index={2}
						editing={editing}
						setEditing={setEditing}
						handleCancel={handleCancel}
						handleSubmit={handleSubmit}
					/>
				</div>

				<div className='post-input'>
					<div className='post-row'>
						<span className='IQ-dash-heading'>
							<h4>DESCRIPTION</h4>
						</span>
						{editing[3] ? (
							<div>
								<textarea
									id='edit-post-3'
									type='textarea'
									name='description'
									value={post.description}
									defaultValue={coachPost && coachPost.postByCoach.description}
									onChange={handleChange}
								/>
							</div>
						) : (
							<div className='post-desc'>
								<p>{original && original.description}</p>
							</div>
						)}
					</div>
					<div className='edit-btns'>
						<PostButtons
							index={3}
							editing={editing}
							setEditing={setEditing}
							handleCancel={handleCancel}
							handleSubmit={handleSubmit}
						/>
					</div>
				</div>

				<div className='post-input'>
					<div className='post-row post-tag'>
						<span className='IQ-dash-heading'>
							<h4>TAGS</h4>
						</span>
						<div className='tag-form'>
							{editing[5] && (
								<div className='tag-input'>
									<input
										id='edit-post-5'
										type='text'
										name='tagString'
										placeholder='Add tags here (i.e Javascript, Node ..)'
										value={post.tagString}
										onChange={handleChange}
									/>
								</div>
							)}
							<div className='tags-container'>
								<p>
									{original && original.tagString
										? original && original.tagString
										: original && tagArray}
								</p>
							</div>
						</div>
					</div>
					<div className='edit-btns'>
						<PostButtons
							index={5}
							editing={editing}
							setEditing={setEditing}
							handleCancel={handleCancel}
							handleSubmit={handleSubmit}
						/>
					</div>
				</div>
				{/* START HOURLY RATE */}
				<div className='post-input'>
					<div className='post-row post-tag'>
						<span className='IQ-dash-heading'>
							<h4>PRICE PER SESSION</h4>
						</span>
						{editing[4] ? (
							<div>
								<div className='slider-post'>
									<div className='slider-inner-boxes-post'>
										<div className='slider-dollar-amounts-post'>
											<p>$0</p>
											<p>
												{post.price === 0 ? '0' : post.price ? post.price :  original && original.price}
											</p>
											<p>$200</p>
										</div>
										<input
											id='edit-post-4'
											name='price-slider'
											type='range'
											min='0'
											max='200'
											value={original.price <= 200 ? post.price : 200}
											defaultValue={original && original.price}
											onChange={handleChange}
											step='1'
										/>
									</div>
								</div>
							</div>
						) : (
							<div>
								<p>${original && original.price}</p>
							</div>
						)}
					</div>
					<div className='edit-btns'>
						<PostButtons
							index={4}
							editing={editing}
							setEditing={setEditing}
							handleCancel={handleCancel}
							handleSubmit={handleSubmit}
						/>
					</div>
				</div>

				<div className='post-input-last'>
					<div className='see-preview'>
						<PreviewCard setOpen={setOpen} open={open} post={original} />
					</div>
				</div>
			</div>

			<div className='IQ-editform'>
				<h2>Availability</h2>
				<Availability />
			</div>
			<div className='IQ-editform'>
				<h2>Coach Post Status</h2>
				{coachPost ? (
					//if coach is done loading
					!loading ? (
						published ? (
							// if coach listing is published, render 'unpublished'
							<div className='delete-post'>
								<p>Your coach post is currently published.</p>
								<button
									className='update-post-btn'
									onClick={e => handleUnpublish(e)}>
									{' '}
									Unpublish{' '}
								</button>
							</div>
						) : (
							// Allow coach to published their listing if unpublished
							<div className='delete-post'>
								<p>Your coach post is currently unpublished.</p>
								<button
									class='update-post-btn'
									onClick={e => handleSubmitPost(e)}>
									{' '}
									Publish{' '}
								</button>
							</div>
						)
					) : null
				) : (
					<p>text</p>
				)}
			</div>
		</>
	);
};

export default CoachBasicInfo;
