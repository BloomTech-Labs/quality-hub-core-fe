import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Icon from '../../../../../global/icons/Icon';
import { ICONS } from '../../../../../global/icons/iconConstants';

import CoachHistoryReport from './3_CoachHistoryReport';
import CoachHistoryReview from './4_CoachHistoryReview';

export default function CoachHistoryRow({ booking }) {
	const [showReport, setShowReport] = useState(false);
	const [showReview, setShowReview] = useState(false);

	return (
		<div>
			<div className='coach-history-row'>
				<div className='history-col'>
					{booking.seeker.first_name} {booking.seeker.last_name}
				</div>
				<div className='history-col'>
					{booking.month}/{booking.day}/{booking.year}
				</div>
				<div className='history-col'>
					{booking.hour}:{booking.minute}
					{booking.minute === 0 && '0'}
				</div>
				<div className='history-col'>
					${booking.coach.post && booking.coach.post.price}
				</div>
				<div className='history-col'>
					{booking.report ? (
						<div
							className='view-report'
							onClick={() => setShowReport(!showReport)}>
							<div>{showReport ? 'Hide' : 'View'} Report</div>
							<Icon icon={ICONS.MORE} width={24} height={24} color='#757575' />
						</div>
					) : (
						<Link
							to={{
								pathname: `/interviewq/history/coachreport/${booking.uniquecheck}`,
								state: { firstName: booking.seeker.first_name },
							}}>
							Write Report
						</Link>
					)}
				</div>
				<div
					className='history-col history-content-toggle'
					onClick={() => setShowReview(!showReview)}>
					{showReview ? 'Hide' : 'View'} Review{' '}
					<Icon icon={ICONS.MORE} width={24} height={24} color='#757575' />
				</div>
			</div>
			{showReport && <CoachHistoryReport booking={booking} />}
			{showReview && <CoachHistoryReview booking={booking} />}
		</div>
	);
}
