// Libraries
import React from 'react';
import { tag } from 'postcss-selector-parser';

// Styles & Icons
import './CoachCard.scss';
import Icon from '../../../globalIcons/Icon';
import { ICONS } from '../../../globalIcons/iconConstants';

const CoachCard = ({ post }) => {
	let { coach } = post;

	return (
		<div className='coach-card'>
			<div className='coachcard-header'>
				<div className='coachcard-header-txt'>
					<h3>
						{coach.first_name} {coach.last_name}
					</h3>
					<h4>${post.price} per hour</h4>
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
					{post.industry.name}
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
					{post.position} - {coach.city}, {coach.state}
				</p>
				<p>
					<span className='coachcard-icon'>
						<Icon icon={ICONS.STAR} width={19} height={20} color='#595959' />
					</span>
					4.9
				</p>
			</div>
			<div className='coachcard-description'>
				<p>{post.description}</p>
				{/* {post.tags.map(tag => (
						<p key={tag.id}>{tag.name}</p>
					))} */}
			</div>
			<div className='coachcard-footer'>
				<div className='coachcard-links'>
					<Icon icon={ICONS.LINKEDIN} width={24} height={24} />
					<Icon icon={ICONS.TWITTER} width={24} height={24} />
				</div>
				<button className='interview-button' disabled>
					Request Interview
				</button>
			</div>
		</div>
	);
};

export default CoachCard;
