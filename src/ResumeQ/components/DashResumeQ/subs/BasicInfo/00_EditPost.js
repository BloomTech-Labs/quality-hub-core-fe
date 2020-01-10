// Libraries
import React, { useState, useEffect } from 'react';

import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_USERS_LISTING, GET_INDUSTRIES, UPDATE_POST } from '../Resolvers';
import {GET_USER} from '../../../Marketplace/Resolvers'
import './00_EditForm.scss';
import PreviewCard from './02_CoachDashPreviewModal';
import CompanyInput from './03_CompanyInput';
import PositionInput from './04_PositionInput';
import IndustryInput from './05_IndustryInput';
import TagInput from './06_TagInput';
import DescInput from './07_DescInput';
import PriceInput from './08_PriceInput';

const CoachBasicInfo = ({ myArray, userData, setOpen, open }) => {
	//GraphQL Queries/Mutations
	// const { data: industries } = useQuery(GET_INDUSTRIES);
	const { data, loading } = useQuery(GET_USERS_LISTING)
	const reviewerListing = data.listingByReviewer
	console.log('my listing', reviewerListing)
	const [changeField] = useMutation(UPDATE_POST);

	const [editing, setEditing] = useState([
		false,
		false,
		false,
		false,
		false,
		false,
	]);
	let coachObj = reviewerListing && reviewerListing;
	const [post, setPost] = useState({...coachObj, tagString: ''});
	const [deleteTags, setDelete] = useState([]);
  //Component State
//   function createTagElements(tags) {
//     return tags.map(tag => (
// 			<button key={tag.id} className='tag-button'>
// 				{tag.name}
// 				<span
// 					className={editing[5] ? '' : 'hidden'}
// 					id={tag.id}
// 					onClick={handleTagRemove}>
// 					{' '}
// 					x{' '}
// 				</span>
// 			</button>
// 		));
//   }
// 	let tagArray = reviewerListing && createTagElements(reviewerListing.postByCoach.tags);
	const [original, setOriginal] = useState(coachObj);

	useEffect(() => {
		if (reviewerListing) {
		  setOriginal({ ...reviewerListing['postByCoach'] });
		}
	}, [reviewerListing]);

	//Handler Functions
	const handleChange = e => {
		console.log(e.target.value);
		if (e.target.name === 'price') {
			if (/^\$[0-9]*$/gm.test(e.target.value)) {
				let newPrice = e.target.value.split('$');
				setPost({
					id: reviewerListing.me.reviewerListing.id,
					[e.target.name]: parseInt(newPrice[1]),
				});
				return;
			} else {
				return;
			}
		}
		if (e.target.name === 'price-slider') {
			setPost({
				id: reviewerListing.me.reviewerListing.id,
				price: parseInt(e.target.value),
			});
			return;
		} else {
			setPost({
				id: reviewerListing.me.reviewerListing.id,
				[e.target.name]: e.target.value,
			});
		}
	};

	const handleCancel = index => {
		setPost({
			...original,
			id: reviewerListing.me.reviewerListing.id,
		});
		let newEditing = [...editing];
		newEditing[index] = false;
		setEditing(newEditing);
		if (index === 5) {
      setOriginal({ ...original});
      setPost({...post})
			setDelete([]);
		}
	};

	// useEffect(() => {
	// 	if (original.tagString) {
    //   let tags = createTagElements(original.tags);
	// 		setOriginal({ ...original, tagString: tags });
	// 	}
	// 	// eslint-disable-next-line
	// }, [editing[5], original.tags]);

	const handleSubmit = (e, index) => {
		let keyval = Object.keys(post);
		e.preventDefault();
		changeField({ variables: post })
			.then(res => {
				if (keyval[1] === 'tagString') {
					let tags = res.data.updatePost.tags;
          setOriginal({ ...original, tags: tags });
				} else {
          setOriginal({ ...original, [keyval[1]]: post[keyval[1]] });
				}
				let newEditing = [...editing];
				newEditing[index] = false;
        setEditing(newEditing);
        setPost({ ...original, [keyval[1]]: post[keyval[1]], tagString: '' });
        setDelete([]);
			})
			.catch(err => {
				console.log(err);
			});
	};

	// function handleTagRemove(e) {
	// 	let tagID = e.target.id;
	// 	let newArray = original.tags.filter(tag => tagID !== tag.id);
	// 	let newNodes = tagArray.filter(tag => tag.key !== tagID);
	// 	tagArray = newNodes;
	// 	setOriginal({ ...original, tags: newArray, tagString: tagArray });
	// 	setDelete(arr => [...arr, { id: tagID }]);
	// }

	return (
		<div className='IQ-editform'>
			{/* START BASIC INFO */}
			<h2>Coach Post</h2>
      <CompanyInput
        editing={editing} 
        setEditing={setEditing}
        original={original}
        post={post}
        handleChange={handleChange}
        handleCancel={handleCancel}
        handleSubmit={handleSubmit}
      />
			<PositionInput
        editing={editing} 
        setEditing={setEditing}
        original={original}
        post={post}
        handleChange={handleChange}
        handleCancel={handleCancel}
        handleSubmit={handleSubmit}
      />
      {/* <IndustryInput 
        editing={editing} 
        setEditing={setEditing}
        original={original}
        post={post}
        handleChange={handleChange}
        handleCancel={handleCancel}
        handleSubmit={handleSubmit}
        industries={industries}
      /> */}
      {/* <TagInput
        editing={editing} 
        setEditing={setEditing}
        original={original}
        post={post}
        handleChange={handleChange}
        handleCancel={handleCancel}
        handleSubmit={handleSubmit}
        tagArray={tagArray}
      /> */}
      <DescInput
        editing={editing} 
        setEditing={setEditing}
        original={original}
        post={post}
        handleChange={handleChange}
        handleCancel={handleCancel}
        handleSubmit={handleSubmit}
      />
			{/* START HOURLY RATE */}
      <PriceInput 
        editing={editing} 
        setEditing={setEditing}
        original={original}
        post={post}
        handleChange={handleChange}
        handleCancel={handleCancel}
        handleSubmit={handleSubmit} 
      />
			<div className='post-input-last'>
        <PreviewCard setOpen={setOpen} open={open} post={original} />
			</div>
		</div>
	);
};

export default CoachBasicInfo;
