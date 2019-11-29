import React from 'react';
import CoachBooking from './CoachBooking';
import SeekerBooking from './SeekerBooking'
import {
	format,
	isSameMonth,
	isSameDay,
	toDate,
	endOfMonth,
	startOfWeek,
	endOfWeek,
	addDays,
	startOfMonth,
} from 'date-fns';

const Cells = ({ onDateClick, currentMonth, selectedDate }) => {
	const monthStart = startOfMonth(currentMonth);
	const monthEnd = endOfMonth(monthStart);
	const startDate = startOfWeek(monthStart);
	const endDate = endOfWeek(monthEnd);
	const dateFormat = 'd';
	const rows = [];
	let days = [];
	let day = startDate;
	let formattedDate = '';
	let cellId = '';
	while (day <= endDate) {
		for (let i = 0; i < 7; i++) {
			formattedDate = format(day, dateFormat);
			cellId = format(day, 'Md');
			const cloneDay = day;
			days.push(
				<div
					id={cellId}
					className={`col cell ${
						!isSameMonth(day, monthStart)
							? 'disabled'
							: isSameDay(day, selectedDate)
							? 'selected'
							: ''
					}`}
					key={day}
					onClick={() => onDateClick(toDate(cloneDay))}>
						
					<span className='number'>{formattedDate}</span>
					<span className='bg'>{formattedDate}</span>
					
				</div>,
			);
			day = addDays(day, 1);
		}
		rows.push(
			<div className='row' key={day}>
				{days}
			</div>,
		);
		days = [];
  }

	
	return( 
	<>
	<div className='calendar-body'>{rows}</div>
	<CoachBooking />
	<SeekerBooking />
	</>
	);
};

export default Cells;
