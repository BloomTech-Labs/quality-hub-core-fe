import React from 'react';
import './QNav.scss';

import interviewQblue from '../../../globalIcons/interviewQblue.svg';
import resumeQ from '../../../globalIcons/resumeQ.svg';
import designQ from '../../../globalIcons/designQ.svg';

export default function QNav() {
	return (
		<div className='QNav'>
			<div>
				<img src={interviewQblue} alt='Active InterviewQ logo' />
				<div className='QNav-main'>InterviewQ</div>
			</div>
			<a href='/'>
				<img src={resumeQ} alt='ResumeQ logo' />
				<div className='QNav-btn'>ResumeQ</div>
			</a>
			<a href='/'>
				<img src={designQ} alt='DesignQ logo' />
				<div className='QNav-btn'>DesignQ</div>
			</a>
		</div>
	);
}
