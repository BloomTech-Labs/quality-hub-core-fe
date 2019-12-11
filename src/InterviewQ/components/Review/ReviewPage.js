import React from 'react';

import ReviewForm from './ReviewForm';

import './ReviewPage.scss';

const ReviewPage = (props) => {
  return (
    <div className='review-page'>
      <h2>Rating & Review</h2>
      <hr />
      <p>Your review will help other job seekers find the best coach.</p>
      <ReviewForm location={props.location} />
    </div>
  )
}

export default ReviewPage;