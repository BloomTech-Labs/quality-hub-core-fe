import React from 'react';
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

const SmallCells = ({ onDateClick, currentMonth, selectedDate }) => {
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
					className={`small-col small-cell `}
					key={day}
					onClick={() => onDateClick(toDate(cloneDay))}>
						
					<div className={`number ${
						!isSameMonth(day, monthStart)
							? 'disabled'
							: isSameDay(day, selectedDate)
							? 'small-selected'
							: ''
					}`}><p>{formattedDate}</p></div>
					{/* <span className='bg'>{formattedDate}</span> */}
					
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
	</>
	);
};

export default SmallCells;
