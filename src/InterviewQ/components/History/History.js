import React from 'react';
import './History.scss';

import CoachHistory from './subs/CoachHistory/1_CoachHistory';
import SeekerHistory from './subs/SeekerHistory/1_SeekerHistory';

export default function History() {
	return (
		<div className='history-wrapper'>
			<CoachHistory />
			<SeekerHistory />
		</div>
	);
}
