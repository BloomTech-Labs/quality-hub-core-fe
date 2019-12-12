import React from 'react';
import './History.scss';

import CoachHistory from './CoachHistory';
import SeekerHistory from './SeekerHistory';

export default function History() {
	return (
		<div className='history-wrapper'>
			<h2>History</h2>
			<CoachHistory />
			<SeekerHistory />
		</div>
	);
}
