import React, {  useEffect, useState } from 'react';
import { times as timeArray, months, years } from './TimeArrays'

import { useQuery } from "@apollo/react-hooks";
import { Link } from 'react-router-dom';
import { ALL_BOOKINGS } from './Queries';
import {
  format,
  getWeek,
  getDate,
  getYear,
  getMonth,
	startOfWeek,
	endOfWeek,
  addDays,
  addWeeks,
  subWeeks
} from 'date-fns';
import WeekBooking from './WeekBooking';

import { nextArrow } from '../../../../globalIcons/nextArrow';
import { backArrow } from '../../../../globalIcons/backArrow';

const WeekView = ({ onDateClick, setSelectedDate, selectedDate }) => {
   const currentWeek = getWeek(selectedDate);
   const scheduleBody = document.getElementsByName('weekContainer');
  const { data } = useQuery(ALL_BOOKINGS, {variables: {seekerId: localStorage.getItem('id'), coachId: localStorage.getItem('id')}});

const allBookings = data && data.bookingsByCoach.concat(data.bookingsBySeeker);
 const filterBookings =
		data &&
		allBookings.filter(booking => {
      let bookingDate = new Date(booking.year, booking.month - 1, booking.day);
      let bookingWeek = getWeek(bookingDate);
      
			return currentWeek === bookingWeek;
    });
	const firstDay = startOfWeek(selectedDate);
	const lastDay = endOfWeek(selectedDate);
  const dateFormat = 'd';
  
	let day = firstDay;
	let days = [];
let times = [];

   
  while (day <= lastDay) {
		for (let i = 0; i < 7; i++) {
      // eslint-disable-next-line
      let cellId = '';
			let formattedDate = format(day, dateFormat);
			let dayName = format(day, 'EEEE');
      cellId = format(day, 'Md');
      
			days.push(
				
					<div className={`week-day-header ${dayName}`} key={day}>
						<span className='week-day-title'>{dayName}</span>
						<span className='week-day-sub-title'>{formattedDate}</span>
					</div>
				
				,
			);
			day = addDays(day, 1);
    }
    timeArray.forEach((time, index) =>
		times.push(
		  <div className='time-block' key={index}>
		    {time}
		  </div>,
    ));
	}
	
// ****************original code
//let divcounter = 0;
	//  useEffect(() => {
		// 	 const weekGrid = document.getElementById('weekContainer');
		// 	 const div = document.createElement('div');
		// 	 console.log(weekGrid)
		// 	  data ? divCounter = (filterBookings.length) : divCounter = 337
		//    while (weekGrid && divCounter < 336) {
			// 	   console.log('here');
			// 		weekGrid.appendChild(div);
			// 		divCounter = divCounter + 1
			//  }
// 	}, [allBookings])
// ****************original code





//ALL MY CODE IS ACTUALLY KRISHANS
//ONLY THE THINGS THAT INVOLVE REACT

useEffect(() => {
	if(filterBookings){
		const weekGrid = document.getElementById('weekContainer');
		for(let i = 392 -27 -7 - filterBookings.length*2; i > 0; i--){
			const div = document.createElement('div');
			div.classList.add('sched-placeholder')
			weekGrid.appendChild(div);
		}
	}
}, [filterBookings]);

  const onMonthChange = (e) => {
    const year = getYear(selectedDate);
    const month = e.target.value;
    const day = getDate(selectedDate);
    setSelectedDate(new Date(year, month, day))
  }

  const onYearChange = (e) => {
    const year = e.target.value;
    const month = getMonth(selectedDate);
    const day = getDate(selectedDate);
    setSelectedDate(new Date(year, month, day))
  }

  const handleNext = (e) => {
    setSelectedDate(addWeeks(selectedDate, 1))
  }

  const handleBack = (e) => {
    setSelectedDate(subWeeks(selectedDate, 1))
  }

  useEffect(() => {
    scheduleBody[0].scrollTo(0, 500)
  })
  

return (
	<>
  <div className = 'week-header'>
		<button onClick={handleBack}>{backArrow()}</button>
		<button onClick={handleNext}>{nextArrow()}</button>
		<select onChange={onMonthChange} value={getMonth(selectedDate)}>
			{months.map(month => {
				return (
					<option key={month.num} value={month.num}>
						{month.name}
					</option>
				);
			})}
		</select>
		<select onChange={onYearChange} value={getYear(selectedDate)}>
			{years.map(year => {
				return (
					<option key={year} value={year}>
						{year}
					</option>
				);
			})}
		</select>
		<Link to='/dashboard/schedule'>Month</Link>
    </div>
		<div className='week-container weekview-border' name='weekContainer' id='weekContainer'>
			<div className='time-column'>{times}</div>
			<div className='top-row'>
				<div className='week-day-header time'></div>
				{days}
			</div>
      
			{data &&
				filterBookings.map(booking => (
					<WeekBooking booking={booking} key={booking} />
				))}
		</div>
	</>
);
};

export default WeekView;