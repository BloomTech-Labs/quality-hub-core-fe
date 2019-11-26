import React, { useState } from 'react';
import './Calendar.scss';
import { format, addMonths, subMonths, startOfWeek, addDays } from "date-fns";

import Cells from './Cells.js'

const Calendar = () => {

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const headerDateFormat = "MMMM yyyy";
  const dateFormat = 'dd';
  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  
  let startDate = startOfWeek(currentMonth);

  const onDateClick = (day) => {
    setSelectedDate(day)
  };

  const nextMonth = () => {
		setCurrentMonth(addMonths(currentMonth, 1));
	};

	const prevMonth = () => {
		setCurrentMonth(subMonths(currentMonth, 1));
	};

  

  return (
		<div className='calendar'>
			<h3>Calendar</h3>
			<header className='calendar-header'>
				<div className='header row flex-middle'>
					<div className='col col-start'>
						<div className='icon' onClick={prevMonth}>
            &#x2397;
						</div>
					</div>
					<div className='col col-center'>
						<span>{format(currentMonth, headerDateFormat)}</span>
					</div>
					<div className='col col-end' onClick={nextMonth}>
						<div className='icon'>&#x2398;</div>
					</div>
				</div>
			</header>

			<div className='calendar-days'>
      <div className="days row">
      {days.map(day =>{
      return <div className="col col-center" key={day}>{day}</div> })}
      </div>

      </div>
      

			<div className='calendar-cells'></div>
      <Cells onDateClick={onDateClick} currentMonth={currentMonth} selectedDate={selectedDate}/>
		</div>
	);
}

export default Calendar;