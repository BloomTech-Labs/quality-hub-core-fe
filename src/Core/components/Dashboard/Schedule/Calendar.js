import React, { useState } from 'react';
import './Calendar.scss';
import {
	setMonth,
	getMonth,
	getYear,
} from 'date-fns';

import Cells from './Cells.js';

const Calendar = () => {
	const [currentMonth, setCurrentMonth] = useState(new Date());
	const [selectedDate, setSelectedDate] = useState(new Date());

	// const headerDateFormat = "MMMM yyyy";
	// const dateFormat = 'dd';
	const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

	const months = [
		{ name: 'January', num: 0 },
		{ name: 'February', num: 1 },
		{ name: 'March', num: 2 },
		{ name: 'April', num: 3 },
		{ name: 'May', num: 4 },
		{ name: 'June', num: 5 },
		{ name: 'July', num: 6 },
		{ name: 'August', num: 7 },
		{ name: 'September', num: 8 },
		{ name: 'October', num: 9 },
		{ name: 'November', num: 10 },
		{ name: 'December', num: 11 },
	];

	const years = [2019, 2020, 2021, 2022, 2023];

	// let startDate = startOfWeek(currentMonth);

	const onDateClick = day => {
		setSelectedDate(day);
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
		<div className='calendar'>
			<header className='calendar-header'>
				<div className='header row flex-middle'>
					<div className='col col-start'></div>
					<div className='col col-center'>
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
					</div>
				</div>
			</header>

			<div className='calendar-days'>
				<div className='days row'>
					{days.map(day => {
						return (
							<div className='col col-center' key={day}>
								{day}
							</div>
						);
					})}
				</div>
			</div>

			<div className='calendar-cells'></div>
			<Cells
				onDateClick={onDateClick}
				currentMonth={currentMonth}
				selectedDate={selectedDate}
			/>
		</div>
	);
};

export default Calendar;
