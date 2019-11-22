import React from 'react';
import './QNav.scss';

import interviewQ from '../../icons/interviewQ.svg';
import resumeQ from '../../icons/resumeQ.svg';
import designQ from '../../icons/designQ.svg';

export default function QNav() {
	return (
		<div className='QNav'>
			<div>
				<img src={interviewQ} alt='InterviewQ logo' />
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
