import React, { useState, useEffect, useRef } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import './CoachForm.scss';

import ProgressBar from './ProgressBar';
import CoachForm01 from './CoachForm01';
import CoachForm02 from './CoachForm02';
import CoachForm03 from './CoachForm03';
import CoachForm04 from './CoachForm04';
import CoachForm05 from './CoachForm05';

import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

import Icon from '../../../globalIcons/Icon';
import { ICONS } from '../../../globalIcons/iconConstants';
import { lightbulb } from '../../../globalIcons/lightbulb';

const GET_USER = gql`
	query {
		me {
			linkedin_url
			github_url
			personal_url
			portfolio_url
			twitter_url
			city
			state
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

const CoachForm = props => {
	const node = useRef();
	const [open, setOpen] = useState(true);

	// for sure take this out soon // like as soon as auth0 happens
	useEffect(() => {
		// localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNrMnMxZmIydTAwNnYwNzczdjI4MmIza20iLCJlbWFpbCI6ImRhbkBxdWFpbC5jb20iLCJpYXQiOjE1NzQzNjM5NzUsImV4cCI6MTU3NDQwNzE3NX0.Ay63IqaVSQZmLgEjOEMOvb_NBQ0vLNepzn_NbaDsaMQ')
	});

	useEffect(() => {
		if (open) {
			document.getElementById('overlay').style.display = 'block';
		} else {
			document.getElementById('overlay').style.display = 'none';
		}
	}, [open]);

	const { data, error } = useQuery(GET_USER);
	const { data: industriesData } = useQuery(INDUSTRIES);

	console.log(data);

	const [formState, setFormState] = useState({
		company: '',
		position: '',
		industry: '',
		description: '',
		city: '',
		state: '',
		price: '',
	});

	const [accounts, setAccounts] = useState({
		linkedin_url: '',
		linkedin_switch: false,
		github_url: '',
		github_switch: false,
		website_url: '',
		website_switch: false,
		portfolio_url: '',
		portfolio_switch: false,
		twitter_url: '',
		twitter_switch: false,
	});

	const [progress, setProgress] = useState(1);

	const handleProgress = e => {
		e.preventDefault();
		if (e.target.value) {
			setProgress(prog => prog + 1);
		} else {
			setProgress(prog => prog - 1);
		}
	};

	return (
		<div ref={node}>
			{/* <p onClick={() => setOpen(!open)}>
				CREATE A COACH POSTING
			</p> */}
			<button onClick={() => setOpen(!open)}>
				<Icon icon={ICONS.LIGHTBULB} width={16} height={22} />
				<span className="add-coach-form-button">Become a coach</span>
			</button>
			{open && (
				<div className="add-coach-form">
					<button
						className="close-coach-form-button"
						onClick={() => setOpen(false)}>
						<Icon icon={ICONS.CLOSE} width={24} height={24} />
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
						// value={formState.company}
						// onChange={event => setFormState({...formState, company: event.target.value})}
					/>
					<p className="add-coach-form-row-6">Position</p>
					<input
						className="add-coach-form-row-7"
						type="text"
						name="position"
						placeholder="e.g UX Designer, Software Engineer..."
						// value={formState.company}
						// onChange={event => setFormState({...formState, company: event.target.value})}
					/>
					<p className="add-coach-form-row-6">Industry</p>
					<input
						className="add-coach-form-row-7"
						type="text"
						name="industry"
						placeholder="Select"
						// value={formState.company}
						// onChange={event => setFormState({...formState, company: event.target.value})}
					/>
					<p className="add-coach-form-row-6">Bio</p>
					<input
						className="add-coach-form-row-7"
						type="text"
						name="bio"
						placeholder="eg. I am a software developer at Google with 12 years of experience under my belt..."
						// value={formState.company}
						// onChange={event => setFormState({...formState, company: event.target.value})}
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
								type="range"
								min="0"
								max="200"
								//   value={value}
								//   onChange={handleChange}
								step="1"
							/>
						</div>
					</div>
					<div className="add-coach-form-range-input">
						<input
							type="text"
							name="hourlyrate"
							placeholder="$"
							value="$"
							// value={formState.company}
							// onChange={event => setFormState({...formState, company: event.target.value})}
						/>
					</div>

					{/* <img src="../../../globalIcons/close.svg" /> */}

					{/* <CoachForm01 {...props} formState={formState} setFormState={setFormState} handleProgress={handleProgress} setProgress={setProgress} industriesData={industriesData}/> */}

					<hr className="add-coach-form-hr-1" />

					<p className="add-coach-form-step-title">STEP 3</p>
					<p className="add-coach-form-sub-title">Preview</p>
					<p className="add-coach-form-description">
						This is what seekers will see when your profile matches their search
						parameters. Review the information, and click "Publish" for your
						profile to go live!
					</p>
					<div className="add-coach-form-preview-container">
						{/* <button> */}
						{/* // className="close-coach-form-button" */}

						<div className="add-coach-form-preview-close">
							<Icon icon={ICONS.CLOSE} width={24} height={24} />
						</div>
						<p className="add-coach-form-preview-name">Nicholas Gonzalez</p>
						<p className="add-coach-form-preview-amount">$40 per hour</p>
						{/* </button> */}
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
								Software Engineer
								{/* {post.industry.name} */}
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
								Google - Mountain View, California
								{/* {post.position} - {coach.city}, {coach.state} */}
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
							I'm a seasoned software engineer who has worked at and made an
							impact at some of the biggest companies in the industry. I am
							currently a technical lead/senior software engineer at Google
							where I work on the API, backend and data infrastructure for an
							enterprise product called Talent Insights.
						</p>
						<div className="coachcard-footer">
							<div className="coachcard-links">
								<div className="icon1">
								<Icon icon={ICONS.LINKEDIN} width={24} height={24} />
								</div>
								<div>
								<Icon icon={ICONS.TWITTER} width={24} height={24} />
								</div>
							</div>
						</div>
						<button className="interview-button" disabled>
							Request Interview
						</button>
					</div>

					{/* <CoachForm02 {...props} formState={formState} setFormState={setFormState} handleProgress={handleProgress} setProgress={setProgress}/> */}

					{/* <CoachForm04 {...props} formState={formState} setFormState={setFormState} handleProgress={handleProgress} accounts={accounts} setAccounts={setAccounts} setProgress={setProgress}/> */}
				</div>
			)}
		</div>
	);
};

export default CoachForm;
