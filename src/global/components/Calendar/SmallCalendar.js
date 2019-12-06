import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../Dashboard/Schedule/Calendar.scss';
import { setMonth, getMonth, getYear, addMonths, subMonths, format } from 'date-fns';

import SmallCells from './SmallCells';

import { days, months, years } from '../Dashboard/Schedule/TimeArrays'

const SmallCalendar = () => {
	const [currentMonth, setCurrentMonth] = useState(new Date());
	const [selectedCell, setSelectedCell] = useState(new Date());
	

	// const headerDateFormat = "MMMM yyyy";
	// const dateFormat = 'dd';

	// let startDate = startOfWeek(currentMonth);

	const nextMonth = () => {
		setCurrentMonth(addMonths(currentMonth, 1))
	}
	const lastMonth = () => {
		setCurrentMonth(subMonths(currentMonth, 1))
	}
	const onDateClick = day => {
		setSelectedCell(day);
		console.log(day);
	};

	const onMonthChange = e => {
		const year = getYear(new Date(currentMonth));
		setCurrentMonth(setMonth(new Date(year, 1, 1), e.target.value));
		console.log(currentMonth);
	};

	const onYearChange = e => {
		const month = getMonth(new Date(currentMonth));
		setCurrentMonth(setMonth(new Date(e.target.value, 1, 1), month));
	};

	return (	
		<div className='small-calendar-container'>
		<div className='calendar'>
			<header className='calendar-header'>
				<div className='cal-header row flex-middle'>
					<div className='col col-start'>
					
					</div>
					<div className='col small-calendar-select'>
						<button onClick={lastMonth}>&#x00AB;</button>
						<select
							onChange={onMonthChange}
							value={getMonth(new Date(currentMonth))}>
							{months.map(month => {
								return (
									<option key={month.num} value={month.num}>
										{month.name}
									</option>
								);
							})}
						</select>
						<select
							onChange={onYearChange}
							value={getYear(new Date(currentMonth))}>
							{years.map(year => {
								return (
									<option key={year} value={year}>
										{year}
									</option>
								);
							})}
						</select>
						<button onClick={nextMonth}>&#x00BB;</button>
					</div>
				</div>
			</header>

			<div className="calendar-days">
				<div className="small-days row">
					{days.map(day => {
						return (
							<div className="col small-col-center small-cal" key={day}>
								<p>
								{day}
								</p>
							</div>
						);
					})}
				</div>
			</div>

			<div className="calendar-cells"></div>
			<SmallCells
				onDateClick={onDateClick}
				currentMonth={currentMonth}
				selectedDate={selectedCell}
			/>	
		</div>	
		</div>	
	);
};

export default SmallCalendar;