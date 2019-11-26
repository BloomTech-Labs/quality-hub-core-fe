// Libraries
import React from 'react';

// Styles
import './QNav.scss';

// Icons
import Icon from '../../../globalIcons/Icon';
import { ICONS } from '../../../globalIcons/iconConstants';

export default function QNav() {
	return (
		<div className='QNav'>
			<div>
				<Icon icon={ICONS.INTERVIEWQ} width={24} height={16} color='#096dd9' />
				<div className='QNav-main'>InterviewQ</div>
			</div>
			<a href='/'>
				<Icon icon={ICONS.RESUMEQ} width={18} height={20} />
				<div className='QNav-btn'>ResumeQ</div>
			</a>
			<a href='/'>
				<Icon icon={ICONS.DESIGNQ} width={20} height={20} />
				<div className='QNav-btn'>DesignQ</div>
			</a>
		</div>
	);
}
