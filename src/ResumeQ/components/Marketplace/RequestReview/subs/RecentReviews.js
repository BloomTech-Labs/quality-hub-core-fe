import React from 'react';

import Icon from '../../../../../global/icons/Icon'
import { ICONS } from '../../../../../global/icons/iconConstants'
import { star, greystar } from '../../../../../global/icons/star';
import './RecentReviews.scss'

const RecentReviews = ({ review }) => {
  const { seeker } = review;

  console.log(`RecentReviews, review`, review)

  return (
    <div className="marketplace-review-container">

    <div className='seeker-photo'>
          {seeker.image_url ? (
            <img src={seeker.image_url} alt='Seeker Profile Pic' height="70" width="70" />
          ) : (
              <div className='blank-image'>
                <Icon
                  icon={ICONS.BLANK_AVATAR}
                  color='white'
                  width={40}
                  height={45}
                />
              </div>
            )}
        </div>

        <div className='right-div'>
        <div className="star-container">
          <div className="name-div">
            <p>{seeker.first_name}</p>
          </div>
      
          <div className='star-div'>
          <span className='coachcard-stars'>
            {review.rating >= 0.5 ? star() : greystar()}
            {review.rating >= 1.5 ? star() : greystar()}
            {review.rating >= 2.5 ? star() : greystar()}
            {review.rating >= 3.5 ? star() : greystar()}
            {review.rating >= 4.5 ? star() : greystar()}
          </span>
          </div>
        </div>
      
        <div className='review-div'>
          {review.review && (<p>{review.review}</p>)}
        </div>
        </div>
    </div>
  )
}


export default RecentReviews;
