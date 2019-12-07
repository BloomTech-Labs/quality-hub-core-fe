// Libraries
import React from 'react';
import { Link, Route } from 'react-router-dom';
// import { tag } from 'postcss-selector-parser';

// Styles & Icons
import './CoachCard.scss';
import Icon from '../../../globalIcons/Icon';
import { ICONS } from '../../../globalIcons/iconConstants';

//Component
import CoachModal from './CoachCardModal.js';
import RequestInterview from '../RequestInterview/RequestInterview';

const CoachCard = ({ history, post, setOpen }) => {
	let { coach } = post;
	let maxWidth = 100;

	return (
		<div className='coach-card'>
			<div className='coachcard-header'>
				<div className='coachcard-header-txt'>
					<h3>
						{coach.first_name} {coach.last_name}
					</h3>
					<h4>{post.price === 0 ? 'Free' : `$${post.price} per hour`}</h4>
				</div>
				<div className='coach-photo'>
					{coach.image_url ? (
						<img src={coach.image_url} alt='Coach Profile Pic' />
					) : (
						<img
							src='https://www.birdorable.com/img/bird/th440/california-quail.png'
							alt='Coach Profile Pic'
						/>
					)}
				</div>
			</div>
			<div className='coachcard-info'>
				<p>
					<span className='coachcard-icon'>
						<Icon icon={ICONS.BAG} width={16} height={20} color='#595959' />
					</span>
					{`${post.company} - ${post.position}`}
				</p>
				<p>
					<span className='coachcard-icon'>
						<Icon
							icon={ICONS.LOCATION}
							width={16}
							height={22}
							color='#595959'
						/>
					</span>
					<span className='coachcard-posloc'>
						{coach.city}, {coach.state}
					</span>
				</p>
				<p>
					<span className='coachcard-icon'>
						<Icon icon={ICONS.STAR} width={19} height={20} color='#595959' />
					</span>
					4.9
				</p>
			</div>
			<div className='coachcard-description'>
				<div className='p-ellipsis'>
					{post.description.substring(0, maxWidth)}
					<span>
						{post.description.length >= maxWidth ? '...' : ''}{' '}
						<CoachModal setOpen={setOpen} post={post} />
					</span>
				</div>
			</div>
			<div className='coachcard-footer'>
				<div className='coachcard-links'>
					{post.coach.linkedin_url && (
						<a href={post.coach.linkedin_url} target='_blank'>
							<Icon icon={ICONS.LINKEDIN} width={24} height={24} />
						</a>
					)}
					{post.coach.twitter_url && (
						<a href={post.coach.twitter_url} target='_blank'>
							<Icon icon={ICONS.TWITTER} width={24} height={24} />
						</a>
					)}
				</div>
				<button className='interview-button' disabled>
					<Link to={`interviewq/booking/${coach.id}`}>
					Request Interview
					</Link>
				</button>
			</div>
		</div>
	);
};

export default CoachCard;
