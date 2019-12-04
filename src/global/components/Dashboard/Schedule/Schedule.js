import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Calendar from './Calendar.js'
import WeekView from './WeekView.js';

const Schedule = ({ myArray, userData }) => {
	const [selectedDate, setSelectedDate] = useState(new Date());
  return (
		<div className='schedule'>
			 {/* <Calendar /> */}
		 {/* <Switch>  */}
         {/* <Calendar selectedDate={selectedDate}
							setSelectedDate={setSelectedDate}/>  */}
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
			{/* </Switch> */}
		</div>
	);
}

export default Schedule;