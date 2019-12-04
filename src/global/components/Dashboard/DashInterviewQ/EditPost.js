// Libraries
import React, {useRef, useState, useEffect } from 'react';
import DashboardInput from '../DashboardInput';
import { useQuery, useMutation } from '@apollo/react-hooks';
import PostInput from './PostInput';
import { GET_COACH_POST, GET_INDUSTRIES, UPDATE_POST } from './Resolvers.js'

const CoachBasicInfo = ({ myArray, userData }) => {
	const { data: industries } = useQuery(GET_INDUSTRIES);
	console.log(industries);
	const { data: coachPost } = useQuery(GET_COACH_POST, {
		variables: { coach_id: localStorage.getItem('id') },
	});
	console.log(coachPost);

	 const [changeField] = useMutation(UPDATE_POST);

 
let coachObj = coachPost && coachPost.postByCoach;

const [original, setOriginal] = useState(coachObj);
	// // const original = coachPost && coachPost
	useEffect(() => {
		if(coachPost){
		setOriginal(coachPost.postByCoach)
		}}, [coachPost])

	 console.log("orig", original);
	const [editing, setEditing] = useState([false, false, false, false, false, false]);

	const [post, setPost] = useState({});

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
			setPost({ id: coachPost.postByCoach.id, [e.target.name]: e.target.value });
		}
		console.log(post);
	};

	const handleCancel = e => {
		// setOriginal(coachPost && coachPost.postByCoach)
		setPost({
			id: coachPost.postByCoach.id,
		});
		setEditing([false, false, false, false, false]);
	};

	const handleSubmit = e => {
		let keyval = Object.keys(post);
		console.log('key', keyval)
		console.log(post);
    e.preventDefault();
    changeField({ variables: post })
				.then(res => {
						// if([keyval[1]] === 'industryName'){
						// 	setOriginal({...original, industry: {name: post[keyval[1]]}})
						// }else {
						setOriginal({...original, [keyval[1]]: post[keyval[1]]});
						// }
					console.log(original)
					setEditing([false, false, false, false, false]);
					
				})
				.catch(err => {
					console.log(err);
				});

	};
	


	const tagArray = coachPost && coachPost.postByCoach.tags.map(tag => tag.name).toString();

	console.log(tagArray)
	
	
	return (
		<>
			<div className='editform'>
				<h2>Basic Info</h2>
				<div className='dash-input'>
					<div className='dash-row post-row'>
					<span className="dash-heading">
						<h3>COMPANY</h3>
						</span>
						{editing[0] ? (
							<div>
								<input
									defaultValue={original && original.company}
									name='company'
									value={post.company}
									// placeholder={coachPost && coachPost.postByCoach.company}
									onChange={handleChange}
								/>
							</div>
						) : (
							<div>
							<p>{original && original.company}</p>
							</div>
						)}
						</div>
						<PostInput
							index={0}
							editing={editing}
							setEditing={setEditing}
							handleCancel={handleCancel}
							handleSubmit={handleSubmit}
						/>
					
				</div>
				<div className='dash-input'>
					<div className='dash-row post-row'>
					<span className="dash-heading">
						<h3>POSTION</h3>
						</span>
						{editing[1] ? (
							<div>
								<input
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
						<PostInput
							index={1}
							editing={editing}
							setEditing={setEditing}
							handleCancel={handleCancel}
							handleSubmit={handleSubmit}
						/>
					
				</div>
				
				<div className='dash-input'>
					<div className='dash-row post-row'>
					<span className="dash-heading">
						<h3>INDUSTRY</h3>
						</span>
						{editing[2] ? (
							<div>
								<select
									name='industryName'
									value={post.industryName}
									onChange={handleChange}>
									<option>	{original && original.industryName
									? original && original.industryName
									: original && original.industry.name}</option>
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
						<PostInput
							index={2}
							editing={editing}
							setEditing={setEditing}
							handleCancel={handleCancel}
							handleSubmit={handleSubmit}
						/>
					
				</div>
				<div className='dash-input'>
					<div className='dash-row post-row'>
					<span className="dash-heading">
						<h3>DESCRIPTION</h3>
						</span>
						{editing[3] ? (
							<div>
								<input
									type='textarea'
									name='description'
									value={post.description}
									defaultValue={coachPost && coachPost.postByCoach.description}
									onChange={handleChange}
								/>
							</div>
						) : (
							<div>
							<p>{original && original.description}</p>
							</div>
						)}
						</div>
						<div className='edit-btns'>
							<PostInput
								index={3}
								editing={editing}
								setEditing={setEditing}
								handleCancel={handleCancel}
								handleSubmit={handleSubmit}
							/>
						</div>
					
				</div>
				<div className='dash-input'>
						<div className='dash-row post-row'>
							<span className="dash-heading">
							<h3>TAGS</h3>
							</span>
							{editing[5] ? (
								<div>
								
												<input
												
													type='text'
													name='tagString'
													value={post.tagString}
													defaultValue={original && original.tagString ? original && original.tagString : original && tagArray}
													onChange={handleChange}
												/>
											
									
								</div>
							) : (
								<div>
									<p>{original && original.tagString ? original && original.tagString : original && tagArray}</p>
								</div>
							)}
								</div> 
							<div className='edit-btns'>
								<PostInput
									index={5}
									editing={editing}
									setEditing={setEditing}
									handleCancel={handleCancel}
									handleSubmit={handleSubmit}
								/>
							</div> 
					
					</div> 
			</div>

			<div className='editform'>
				<h2>Hourly Rate</h2>
				<div className='dash-input'>
					<div className='dash-row post-row'>
					<span className="dash-heading">
						<h3>PRICE PER SESSION</h3>
						</span>
						{editing[4] ? (
							<div>
								<div className='slider'>
									<div className='slider-inner-boxes'>
										<div className='slider-dollar-amounts'>
											<p>$0</p>
											<p>$200</p>
										</div>
										<input
											name='price-slider'
											type='range'
											min='0'
											max='200'
											value={original.price <= 200 ? post.price : 200}
											defaultValue={original && original.price}
											onChange={handleChange}
											step='1'
										/>
										<input
											type='number'
											name='price'
											placeholder='$'
											defaultValue={original && original.price}
											value={post.price}
											onChange={handleChange}
										/>
									</div>
								</div>
								{/* <h4>${original && original.price}</h4> */}
							</div>
						) : (
							<div>
							<p>${original && original.price}</p>
							</div>
						)}
						</div>
						<div className='edit-btns'>
						
							<PostInput
								index={4}
								editing={editing}
								setEditing={setEditing}
								handleCancel={handleCancel}
								handleSubmit={handleSubmit}
							/>
						</div>
					
					</div>
					</div>
				 
				</>
		

	);
};

export default CoachBasicInfo;