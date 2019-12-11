import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from "@apollo/react-hooks";
import './Calendar.scss';
import { setMonth, getMonth, getYear, addMonths, subMonths, format } from 'date-fns';
import { ALL_BOOKINGS } from './Queries';

import Cells from './Cells';
import CalendarDetail from './CalendarDetail';

import { nextArrow } from '../../../../globalIcons/nextArrow';
import { backArrow } from '../../../../globalIcons/backArrow';

import { days, months, years } from './TimeArrays'

const Calendar = ({ selectedDate, setSelectedDate }) => {
	// const { data, refetch } = useQuery(ALL_BOOKINGS, {variables: {seekerId: localStorage.getItem('id'), coachId: localStorage.getItem('id')}});
	const [currentMonth, setCurrentMonth] = useState(new Date());
	const [counter, setCounter] = useState(0);
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

	const nextMonth = () => {
		setCurrentMonth(addMonths(currentMonth, 1))
	}
	const lastMonth = () => {
		setCurrentMonth(subMonths(currentMonth, 1))
	}
	const onDateClick = day => {
		setOpen(false);
		setSelectedDate(day);
	};

	useEffect(()=>{
		if(counter > 0){
			setOpen(true);
		}
	},[selectedDate])

	useEffect(()=>{
		setOpen(false);
		setCounter(1);
	},[])

	useEffect(()=>{
		if(currentMonth){
			setOpen(false);
		}
	},[currentMonth])

	const onMonthChange = e => {
		const year = getYear(new Date(currentMonth));
		setCurrentMonth(setMonth(new Date(year, 1, 1), e.target.value));
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
						<button className='calendar-button' onClick={lastMonth}>{backArrow()}</button>
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
						<button className='calendar-button' onClick={nextMonth}>{nextArrow()}</button>

						<Link to='/dashboard/schedule/week'>
						<button className='calendar-button'>
							<p>
							Week
							</p>
							</button>
							</Link>
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
						selectedDate={selectedDate}
					/>
				</div>
			)}		
		</div>		
	);
};

export default Calendar;