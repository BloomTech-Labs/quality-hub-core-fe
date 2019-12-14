import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Icon from '../../../../../global/icons/Icon';
import { ICONS } from '../../../../../global/icons/iconConstants';

import CoachBookingContent from './3_CoachBookingContent';

export default function CoachHistoryRow({ booking }) {
	const [showContent, setShowContent] = useState(false);

	return (
		<div>
			<div className='coach-history-row'>
				<div>
					{booking.seeker.first_name} {booking.seeker.last_name}
				</div>
				<div>
					{booking.month}/{booking.day}/{booking.year}
				</div>
				<div>
					{booking.hour}:{booking.minute}
					{booking.minute === 0 && '0'}
				</div>
				<div>${booking.coach.post.price}</div>
				<div>
					<Link
						to={{
							pathname: `/interviewq/coachreport/${booking.uniquecheck}`,
							state: { firstName: booking.seeker.first_name },
						}}>
						{booking.report ? 'View' : 'Write'} Report{' '}
						{booking.report && (
							<Icon icon={ICONS.MORE} width={24} height={24} color='#757575' />
						)}
					</Link>
				</div>
				<div
					className='history-content-toggle'
					onClick={() => setShowContent(!showContent)}>
					{showContent ? 'Hide' : 'View'} Review{' '}
					<Icon icon={ICONS.MORE} width={24} height={24} color='#757575' />
				</div>
			</div>
			{showContent && <CoachBookingContent booking={booking} />}
		</div>
	);
}
