import React, { useState, useEffect, useRef } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import './Calendar.scss';
import { setMonth, getMonth, getYear, format } from 'date-fns';

import Cells from './Cells';
import CalendarDetail from './CalendarDetail';


import { days, months, years } from './TimeArrays'
import WeekView from './WeekView';

const Calendar = ({ selectedDate, setSelectedDate }) => {
	const [currentMonth, setCurrentMonth] = useState(new Date());
	// const [selectedDate, setSelectedDate] = useState(new Date());
	

	// const headerDateFormat = "MMMM yyyy";
	// const dateFormat = 'dd';

	// let startDate = startOfWeek(currentMonth);
	const node = useRef();
	const [open, setOpen] = useState(false);
	const handleOutsideClick = e => {
		if (node.current) {
			if (node.current.contains(e.target)) {
				return;
			} else {
				setOpen(false);
			}
		} else {
			setOpen(false);
		}
	};

	useEffect(() => {
		if (open) {
			document.addEventListener('mousedown', handleOutsideClick);
		} else {
			document.removeEventListener('mousedown', handleOutsideClick);
		}
	}, [open]);
	const onDateClick = day => {
		setSelectedDate(day);
		setOpen(true);
		console.log(day);
		console.log(open);
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
	
		<div className='calendar' ref={node}>
			<header className='calendar-header'>
				<div className='cal-header row flex-middle'>
					<div className='col col-start'>
						<h2>{format(currentMonth, "MMMM")}</h2>
					</div>
					<div className='col calendar-select'>
						
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
						<Link to='/dashboard/schedule/week'>Week</Link>
					</div>
				</div>
			</header>

			<div className="calendar-days">
				<div className="days row">
					{days.map(day => {
						return (
							<div className="col col-center" key={day}>
								<p>
								{day}
								</p>
							</div>
						);
					})}
				</div>
			</div>

			<div className="calendar-cells"></div>
			<Cells
				onDateClick={onDateClick}
				currentMonth={currentMonth}
				selectedDate={selectedDate}
				open={open}
			/>
			{open && (
				<div className='calendar-detail'>
					<CalendarDetail
						setOpen={setOpen}
						handleOutsideClick={handleOutsideClick}
						selectedDate={selectedDate}
					/>
				</div>
			)}
			{/* <Booking /> */}
			{/* <WeekView selectedDate={selectedDate} /> */}
		
		</div>
		
	);
};

export default Calendar;
