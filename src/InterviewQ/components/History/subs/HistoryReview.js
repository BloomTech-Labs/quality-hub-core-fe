import React from 'react';

import Icon from '../../../../global/icons/Icon';
import { ICONS } from '../../../../global/icons/iconConstants';

export default function HistoryReview({ booking }) {
	const messages = [
		'',
		'Never again!',
		'Meh.',
		'Not bad.',
		'Solid!',
		'Super great!',
	];

	let starsfilled = [];
	let starsblank = [];

	for (let i = 1; i < booking.review.rating; i++) {
		starsfilled.push(
			<Icon icon={ICONS.STAR_YELLOW} width={26} height={24} color='#096dd9' />,
		);
	}

	for (let i = 1; i < 5 - booking.review.rating; i++) {
		starsblank.push(
			<Icon icon={ICONS.STAR_FILL} width={26} height={24} color='#EFEFEF' />,
		);
	}

	return (
		<div className='history-review'>
			<h4>Rating</h4>
			<div className='rating-container'>
				<div className={'stars-container'}>
					{starsfilled}
					{starsblank}
				</div>
				<p className='message'>{messages[booking.review.rating - 1]}</p>
			</div>
			<h4>Review</h4>
			<p>{booking.review.review}</p>
		</div>
	);
}
