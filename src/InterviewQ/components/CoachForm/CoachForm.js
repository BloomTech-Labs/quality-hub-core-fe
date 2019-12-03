import React, { useState, useEffect, useRef } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import './CoachForm.scss';

import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';

import Icon from '../../../globalIcons/Icon';
import { ICONS } from '../../../globalIcons/iconConstants';
import { lightbulb } from '../../../globalIcons/lightbulb';
import { lightbulb2 } from '../../../globalIcons/lightbulb2';
import { checkcircle } from '../../../globalIcons/checkcircle';

import { GET_POSTS } from '../CoachList/CoachList';

const GET_USER = gql`
	query {
		me {
			id
			first_name
			last_name
			linkedin_url
			twitter_url
			city
			state
			image_url
			post {
				id
				description
			}
		}
	}
`;

const INDUSTRIES = gql`
	query {
		industries {
			name
		}
	}
`;

export const ADD_POST = gql`
	mutation createPost(
		$price: Int!
		$position: String!
		$industryName: String!
		$description: String!
		$tagString: String
		$company: String!
		$isPublished: Boolean!
	) {
		createPost(
			price: $price
			position: $position
			industryName: $industryName
			description: $description
			tagString: $tagString
			company: $company
			isPublished: $isPublished
		) {
			id
			price
			position
			industry {
				id
				name
			}
			description
			tags {
				id
				name
			}
			company
			isPublished
			coach {
				id
				first_name
				last_name
				city
				state
				image_url
				personal_url
				blog_url
				twitter_url
				portfolio_url
				linkedin_url
				github_url
			}
		}
	}
`;

const CoachForm = props => {
	const node = useRef();

	//false sets the default to closed
	const [open, setOpen] = useState(false);
	const [done, setDone] = useState(false);
	const [addPost] = useMutation(ADD_POST, {
		update(cache, { data }) {
			const { posts } = cache.readQuery({ query: GET_POSTS });
			// Here we write the data to the query so the coachlist automatically gets updated.
			cache.writeQuery({
				query: GET_POSTS,
				data: { posts: posts.concat([data.createPost]) },
			});
		},
	});

	useEffect(() => {
		if (open) {
			document.getElementById('overlay-coach-form').style.display = 'block';
		} else if (done) {
			document.getElementById('overlay-coach-form').style.display = 'block';
		} else {
			document.getElementById('overlay-coach-form').style.display = 'none';
		}
	}, [open, done]);

	const { data, error } = useQuery(GET_USER);
	const { data: industriesData } = useQuery(INDUSTRIES);

	let image;
	if (data) {
		if (data.me.image_url) {
			image = data.me.image_url;
		} else {
			image = 'https://www.birdorable.com/img/bird/th440/california-quail.png'; //Need to add a default image here if user hasn't uploaded anything yet
		}
	}

	const [formState, setFormState] = useState({
		company: '',
		position: '',
		industryName: 'Architecture and Construction',
		description: '',
		price: 30,
		tagString: '',
		isPublished: true,
	});

	const handleChange = e => {
		if (e.target.name === 'price') {
			if (e.target.value.length < 2) {
				setFormState({
					...formState,
					[e.target.name]: 0,
				});
				return;
			}
			if (/^\$[0-9]*$/gm.test(e.target.value)) {
				let newPrice = e.target.value.split('$');
				setFormState({
					...formState,
					[e.target.name]: parseInt(newPrice[1]),
				});
				return;
			} else {
				return;
			}
		}
		if (e.target.name === 'price-slider') {
			setFormState({
				...formState,
				price: parseInt(e.target.value),
			});
			return;
		}
		setFormState({
			...formState,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = e => {
		e.preventDefault();

		addPost({ variables: formState })
			.then(res => {
				setDone(true);
				setOpen(false);
			})
			.catch(err => {
				console.log(err);
			});
	};

	const handleSave = e => {
		e.preventDefault();
		console.log('save');
		console.log(formState);
		let newFormState = { ...formState, isPublished: false };
		console.log(newFormState);
		addPost({ variables: newFormState })
			.then(res => {
				// setDone(true);
				// setOpen(false);
				closeWindow();
			})
			.catch(err => {
				console.log(err);
			});
	};

	const closeWindow = e => {
		props.refetch();
		setFormState({
			company: '',
			position: '',
			industryName: 'Architecture and Construction',
			description: '',
			price: 30,
			tagString: '',
			isPublished: true,
		});
		setOpen(false);
		setDone(false);
	};

	const setAvailability = e => {
		props.refetch();
		document.getElementById('overlay-coach-form').style.display = 'none';
		setDone(false);
	};
	return (
		<div ref={node}>
			<div id="overlay-coach-form"></div>
			<button onClick={() => setOpen(!open)} className="become-a-coach-btn">
				{/* <Icon icon={ICONS.LIGHTBULB} width={16} height={22} /> */}
				{lightbulb2()}
				<span className="add-coach-form-button">Become a coach</span>
			</button>
			{/* This is the 2nd modal that pops up after you publish a post */}
			{done && (
				<div className="done-modal">
					<button
						className="close-coach-form-button"
						onClick={() => closeWindow()}>
						<Icon icon={ICONS.CLOSE} width={24} height={24} color="rgba(0, 0, 0, 0.54)"/>
					</button>
					<div className="done-modal-content">
						<div className="done-modal-checkcircle">{checkcircle()}</div>
						<div className="done-modal-all-text">
						<p className="done-modal-text-1">Your coach post is live!</p>
						<p className="done-modal-text-2">
							You can edit your coach post and set your availability in your
							dashboard.
						</p>
						</div>
						<div className="done-modal-buttons">
							<button onClick={() => closeWindow()}>Skip for now</button>
							<Link
								to="/dashboard/schedule"
								className="add-coach-set-availability-link">
								<button onClick={() => setAvailability()} className="done-modal-set-availability-btn">
									Set Availability
								</button>
							</Link>
						</div>
					</div>
				</div>
			)}
			{/* The create post form */}
			{open && (
				<>
				<div className="add-coach-form-background">
				<div className="add-coach-form">
					<button
						className="close-coach-form-button"
						onClick={() => closeWindow()}>
						<Icon icon={ICONS.CLOSE} width={24} height={24} color="rgba(0, 0, 0, 0.54)"/>
					</button>
					<div className="add-coach-form-row-1">
						<div>{lightbulb()}</div>{' '}
						<div className="add-coach-form-header">
							Create your coach posting here!
						</div>
					</div>
					<p className="add-coach-form-row-2">
						Please fill the following fields to be listed as a coach on
						InterviewQ.
						<br />
						This information will help seekers decide which coaches to select,
						so be sure to sell yourself well!
					</p>
					<p className="add-coach-form-step-title">STEP 1</p>
					<p className="add-coach-form-sub-title">Profile</p>
					<p className="add-coach-form-description">
						Please tell us about your career so far and your accomplishments.
					</p>
					{/* Should be changed to a label */}
					<p className="add-coach-form-row-6">Company</p>
					<input
						className="add-coach-form-row-7"
						type="text"
						name="company"
						placeholder="e.g Google, Facebook..."
						value={formState.company}
						onChange={handleChange}
					/>
					<p className="add-coach-form-row-6">Position</p>
					<input
						className="add-coach-form-row-7"
						type="text"
						name="position"
						placeholder="e.g UX Designer, Software Engineer..."
						value={formState.position}
						onChange={handleChange}
					/>
					<p className="add-coach-form-row-6">Industry</p>
					<select
						name="industryName"
						value={formState.industryName}
						onChange={handleChange}>
						{industriesData &&
							industriesData.industries.map(industries => {
								return (
									<option value={industries.name} key={industries.name}>
										{industries.name}
									</option>
								);
							})}
					</select>
					{/* Needs to be textarea */}
					<p className="add-coach-form-row-6">Description</p>
					<input
						className="add-coach-form-row-7"
						type="text"
						name="description"
						placeholder="eg. I am a software developer at Google with 12 years of experience under my belt..."
						value={formState.description}
						onChange={handleChange}
					/>
					<p className="add-coach-form-row-6">Keywords</p>
					<input
						className="add-coach-form-row-7"
						type="text"
						name="tagString"
						placeholder="e.g Java, C++, Figma..."
						value={formState.tagString}
						onChange={handleChange}
					/>

					<hr className="add-coach-form-hr-1" />

					<p className="add-coach-form-step-title">STEP 2</p>
					<p className="add-coach-form-sub-title">Hourly Rate</p>
					<p className="add-coach-form-description">
						Please set a price per session. Usually a session is 1 hour long. To
						get the most clients, we recomment setting your rate between $20 and
						$50.
					</p>
					<div className="slider">
						<div className="slider-inner-boxes">
							<div className="slider-dollar-amounts">
								<p>$0</p>
								<p>$200</p>
							</div>
							<input
								name="price-slider"
								type="range"
								min="0"
								max="200"
								value={formState.price <= 200 ? formState.price : 200}
								onChange={handleChange}
								step="1"
							/>
						</div>
					</div>
					<div className="add-coach-form-range-input">
						<input
							type="text"
							name="price"
							placeholder="$"
							value={`$${formState.price}`}
							onChange={handleChange}
						/>
					</div>

					<hr className="add-coach-form-hr-1" />

					<p className="add-coach-form-step-title">STEP 3</p>
					<p className="add-coach-form-sub-title">Preview</p>
					<p className="add-coach-form-description">
						This is what seekers will see when your profile matches their search
						parameters. Review the information, and click "Publish" for your
						profile to go live!
					</p>
					<div className="add-coach-form-preview-container">
						<div className="add-coach-form-preview-close">
							<Icon icon={ICONS.CLOSE} width={24} height={24} color="rgba(0, 0, 0, 0.54)"/>
						</div>
						<div className="add-coach-form-preview-top">
							<div className="add-coach-form-preview-top-text">
								<p className="add-coach-form-preview-name">
									{data && `${data.me.first_name} ${data.me.last_name}`}
								</p>
								<p className="add-coach-form-preview-amount">
									${formState.price} per hour
								</p>
							</div>
							<img
								className="add-coach-form-preview-coach-photo"
								src={image}
								alt="Coach Profile Pic"
							/>
						</div>
						<div className="coachcard-info">
							<p>
								<span className="coachcard-icon">
									<Icon
										icon={ICONS.BAG}
										width={24}
										height={24}
										color="#595959"
									/>
								</span>
								{formState.company}
								{formState.company !== '' && formState.position !== ''
									? ' - '
									: null}
								{formState.position}
							</p>
							<p>
								<span className="coachcard-icon">
									<Icon
										icon={ICONS.LOCATION}
										width={24}
										height={24}
										color="#595959"
									/>
								</span>
								{data && `${data.me.city}, ${data.me.state}`}
							</p>
							<p>
								<span className="coachcard-icon">
									<Icon
										icon={ICONS.STAR}
										width={24}
										height={24}
										color="#595959"
									/>
								</span>
								4.2
							</p>
						</div>
						<p className="add-coach-form-preview-description">
							{formState.description}
						</p>
						<div className="coachcard-footer">
							<div className="coachcard-links">
								{data && data.me.linkedin_url && (
									<div className="icon1">
										<Icon icon={ICONS.LINKEDIN} width={24} height={24} />
									</div>
								)}
								{data && data.me.twitter_url && (
									<div>
										<Icon icon={ICONS.TWITTER} width={24} height={24} />
									</div>
								)}
							</div>
						</div>
						<button className="interview-button" disabled>
							Request Interview
						</button>
					</div>
					<div className="add-coach-form-bottom-buttons">
						<button
							className="add-coach-form-save-and-exit"
							onClick={e => handleSave(e)}>
							Save and exit
						</button>
						<button
							className="add-coach-form-publish"
							onClick={e => handleSubmit(e)}>
							Publish
						</button>
					</div>
				</div>
				</div>
				</>
			)}
		</div>
	);
};

export default CoachForm;
