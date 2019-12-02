// Library
import React, { useState } from 'react';

// Styles & Icons
import './LandingPage.scss';
import Icon from '../../../globalIcons/Icon';
import { ICONS } from '../../../globalIcons/iconConstants';

// Components
// import LandingPageCTA from './LandingPageCTA';
import LandingPageHeader from './LandingPageHeader';
import QNav from '../QNav';
import Search from '../Search';
import CoachList from '../CoachList/CoachList';

export default function InterviewLandingPage() {
<<<<<<< HEAD
=======
	const [fields, setFields] = useState({
		tag: '',
		price: '',
		industry: '',
		orderBy: '',
	});

>>>>>>> 672bb36ecfcf1dbe82dc352e241743acb29ed7ad
	return (
		<div className='interview-container'>
			{/* <LandingPageCTA /> */}
			<div className='interview-landing-page'>
				<QNav />
				<div className='interviewq-header-container'>
					<LandingPageHeader />
					<div className='interviewq-header-btns'>
						<button>
							<Icon icon={ICONS.LIGHTBULB} width={16} height={22} />
							<span className='becomecoach-btn'>Become a coach</span>
						</button>
						<button>
							<Icon icon={ICONS.FILTER} width={20} height={18} />
							<span className='filters-btn'>Filters </span>
						</button>
					</div>
				</div>
				<div className='landingpage-container'>
					<CoachList />
				</div>
			</div>
		</div>
	);
}
