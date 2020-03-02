import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import Calendar from './Calendar.js'
import WeekView from './WeekView.js';
import Icon from '../../../../icons/Icon';
import { ICONS } from '../../../../icons/iconConstants';

const Schedule = () => {
	const [selectedDate, setSelectedDate] = useState(new Date());
	return (
		<div className='schedule'>
			<div className='coachinfo-header'>
				<h1>Schedule</h1>
			</div>
			<Route
				exact
				path='/dashboard/schedule'
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
				path='/dashboard/schedule/week'
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