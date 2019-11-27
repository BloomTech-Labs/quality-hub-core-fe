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
			<div className='QNav-row QNav-row-highlight'>
				<Icon icon={ICONS.INTERVIEWQ} width={24} height={24} color='#096dd9' />
				<div className='QNav-main'>InterviewQ</div>
			</div>
			<a href='/'>
			<div className='QNav-row'>

				<Icon icon={ICONS.RESUMEQ} width={24} height={22} />
				<div className='QNav-btn'>ResumeQ</div>
				</div>
			</a>
			<a href='/'>
				<div className='QNav-row'>
				<Icon icon={ICONS.DESIGNQ} width={24} height={20} />
				<div className='QNav-btn'>DesignQ</div>
				</div>
			</a>
		</div>
	);
}
