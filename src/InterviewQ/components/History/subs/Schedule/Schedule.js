import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import Calendar from './Calendar.js'
import WeekView from './WeekView.js';
import Icon from '../../../../../global/icons/Icon';
import { ICONS } from '../../../../../global/icons/iconConstants';

const Schedule = () => {
	const [selectedDate, setSelectedDate] = useState(new Date());
  return (
		<div className='schedule'>
					<div className='coachinfo-header'>
				{/* <div className='circle-blue'>
					<Icon icon={ICONS.SCHEDULE} width={26} height={28} color='white' />
				</div> */}
				<h1>Schedule</h1>
			</div>
				 	<Route
					exact
					path='/interviewq/schedule'
					render={props => (
						<Calendar
							{...props}
							selectedDate={selectedDate}
							setSelectedDate={setSelectedDate}
						/>
					)}
				/>
      
				<Route
					exact
					path='/interviewq/schedule/week'
					render={props => (
						<WeekView
							{...props}
							selectedDate={selectedDate}
							setSelectedDate={setSelectedDate}
						/>
					)}
				/>
		</div>
	);
}

export default Schedule;