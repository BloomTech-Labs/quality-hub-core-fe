// Libraries
import React, { useState, useEffect } from 'react';
import { tag } from 'postcss-selector-parser';

// Styles & Icons
import './CoachCardModal.scss';
import Icon from '../../../globalIcons/Icon';
import { ICONS } from '../../../globalIcons/iconConstants';

// import CoachModal from "./CoachCardModal.js";


const CoachCard = ({ post }) => {
	let { coach } = post;


	return (
		<div className='coachcard-expand'>
				{/* <button
						className="close-coach-card-button"
						onClick={() => setOpen(false)}>
						<Icon icon={ICONS.CLOSE} width={24} height={24} />
					</button> */}
			<div className='coachcard-header-expand'>
				<div className='coachcard-header-txt-expand'>
					<h3>
						{coach.first_name} {coach.last_name}
					</h3>
					<h4>${post.price} per hour</h4>
				</div>
				<div className='coach-photo-expand'>
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
			<div className='coachcard-info-expand'>
				<p>
					<span className='coachcard-icon-expand'>
						<Icon icon={ICONS.BAG} width={16} height={20} color='#595959' />
					</span>
					{post.industry.name}
				</p>
				<p>
					<span className='coachcard-icon-expand'>
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
					<span className='coachcard-icon-expand'>
						<Icon icon={ICONS.STAR} width={19} height={20} color='#595959' />
					</span>
					4.9
				</p>
			</div>
			<div className='coachcard-description-expand'>
				<p>{post.description}</p>
				{/* {post.tags.map(tag => (
						<p key={tag.id}>{tag.name}</p>
					))} */}
			</div>
			<div className='coachcard-footer-expand'>
				<div className='coachcard-links-exand'>
					<Icon icon={ICONS.LINKEDIN} width={24} height={24} />
					<Icon icon={ICONS.TWITTER} width={24} height={24} />
				</div>
				<button className='interview-button-expand' disabled>
					Request Interview
				</button>
			</div>
		</div>
		
	);
};

export default CoachCard;