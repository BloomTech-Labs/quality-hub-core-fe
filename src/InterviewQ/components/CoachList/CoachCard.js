// Libraries
import React, { useState, useEffect } from 'react';
import { tag } from 'postcss-selector-parser';

// Styles & Icons
import './CoachCard.scss';
import Icon from '../../../globalIcons/Icon';
import { ICONS } from '../../../globalIcons/iconConstants';

//Component 
import CoachModal from "./CoachCardModal.js"

const CoachCard = ({ post, setOpen }) => {
	let { coach } = post;
  let maxWidth = 160;

	return (
		<div className='coach-card'>
      <div>
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
            {post.position}
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
            {post.company} - {coach.city}, {coach.state}
          </p>
          <p>
            <span className='coachcard-icon'>
              <Icon icon={ICONS.STAR} width={19} height={20} color='#595959' />
            </span>
            4.9
          </p>
        </div>
        <div className='coachcard-description'>
          <p className='p-ellipsis'>
            {post.description.substring(0,maxWidth)}
            <span>{post.description.length >= maxWidth ? '...' : ""} <CoachModal setOpen={setOpen} post={post}/></span>
          </p> 
        </div>
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
