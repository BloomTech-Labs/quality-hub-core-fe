import React from 'react';
import './ReviewModal.scss';
import { format } from 'date-fns';
import { star, greystar } from '../../../../../../global/icons/star'

const ReviewCard = ({ review }) => {
	return (
		<div className='iq-review-card'>
			<div className='iq-review-card-header'>
        <div className='iq-review-seeker'>
          <span>{`${review.seeker.first_name} ${review.seeker.last_name}`}</span>
        </div>
				<div className='iq-review-time'>
					<span>{format(new Date(review.createdAt), 'PPP  p ')}</span>
				</div>
				<div className='iq-review-stars'>
        {review.rating >= .5 ? star() : greystar()}
        {review.rating >= 1.5 ? star() : greystar()}
        {review.rating >= 2.5 ? star() : greystar()}
        {review.rating >= 3.5 ? star() : greystar()}
        {review.rating >= 4.5 ? star() : greystar()}
        </div>
			</div>
			<div className='iq-review-content'>
				<p>{review.review}</p>
			</div>
		</div>
	);
};

export default ReviewCard;