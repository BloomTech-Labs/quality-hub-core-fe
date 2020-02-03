import React from 'react';

import Icon from '../../icons/Icon'
import { ICONS } from '../../icons/iconConstants'

// this is a reusable component based on InterviewQ HistoryReview component
const ReviewGiven = ({ review }) => {
  const messages = [
    '',
    'Never again!',
    'Meh.',
    'Not bad.',
    'Solid!',
    'Super great!',
  ];

  console.log(`ReviewGiven // review`, review)

  let starsfilled = [];
  let starsblank = [];

  for (let i = 1; i <= review.rating; i++) {
    starsfilled.push(
      <Icon
        key={i}
        icon={ICONS.STAR_YELLOW}
        width={30}
        height={30}
        color='#fa8c16'
      />,
    );
  }

  for (let i = 1; i <= 5 - review.rating; i++) {
    starsblank.push(
      <Icon
        key={i}
        icon={ICONS.STAR_FILL}
        width={30}
        height={30}
        color='#efefef'
      />,
    );
  }

  return (
    <div className='history-review'>
      <h4>Rating</h4>
      <div className='history-review-rating-container'>
        <div className={'history-review-stars-container'}>
          {starsfilled}
          {starsblank}
        </div>
        <p className='message'>{messages[review.rating]}</p>
      </div>
      {review.review && <div>
        <h4>Review</h4>
        <p>{review.review}</p>
      </div>}
    </div>
  )
}

export default ReviewGiven;
