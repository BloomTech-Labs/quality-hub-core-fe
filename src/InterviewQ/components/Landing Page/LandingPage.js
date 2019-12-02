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
import CoachForm from '../CoachForm/CoachForm';

export default function InterviewLandingPage() {
	const [toggleFilter, setToggleFilter] = useState(true);
	const [fields, setFields] = useState({
		tag: '',
		price: '',
		industry: '',
		orderBy: '',
	});

	return (
		<div className='interview-container' id="interview-container">
			{/* <LandingPageCTA /> */}
			<div className='interview-landing-page'>
				<QNav />
				<div className='interviewq-header-container'>
					<LandingPageHeader />
					<div className='interviewq-header-btns'>
						{/* <button>
							<Icon icon={ICONS.LIGHTBULB} width={16} height={22} />
							<span className='becomecoach-btn'>Become a coach</span>
						</button> */}
						<CoachForm />
						{/* <button className="interviewq-filter-btn">
							<Icon icon={ICONS.FILTER} width={20} height={18} /> */}
						{/* <button>
							<Icon
								icon={ICONS.LIGHTBULB}
								width={16}
								height={22}
								color='#5f6368'
							/>
							<span className='becomecoach-btn'>Become a coach</span>
						</button> */}
						<button
							onClick={() => setToggleFilter(!toggleFilter)}
							style={{
								background: toggleFilter && 'rgba(9, 109, 217, 0.1)',
								color: toggleFilter && '#096dd9',
								border: toggleFilter && '1px solid #096dd9',
							}}>
							<Icon
								icon={ICONS.FILTER}
								width={20}
								height={18}
								color={toggleFilter ? '#096dd9' : '#5f6368'}
							/>
							<span className='filters-btn'>Filters </span>
						</button>
					</div>
				</div>
				<div className='landingpage-container'>
					<CoachList toggleFilter={toggleFilter}/>
				</div>
			</div>
		</div>
	);
}
