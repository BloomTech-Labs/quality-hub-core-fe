import React, { useState, useEffect } from 'react';
import { times as timeArray } from './TimeArrays'

import { useQuery } from "@apollo/react-hooks";
import { Link } from 'react-router-dom';
import { ALL_BOOKINGS } from './Queries';
import {
  format,
  getWeek,
	startOfWeek,
	endOfWeek,
	addDays,
} from 'date-fns';
import WeekBooking from './WeekBooking';

const WeekView = ({ onDateClick, currentMonth, selectedDate }) => {
  console.log('is rendering')
   const currentWeek = getWeek(selectedDate);
   
  const { data } = useQuery(ALL_BOOKINGS, {variables: {seekerId: localStorage.getItem('id'), coachId: localStorage.getItem('id')}});

const allBookings = data && data.bookingsByCoach.concat(data.bookingsBySeeker);
console.log('bookings', allBookings);
 const filterBookings =
		data &&
		allBookings.filter(booking => {
      console.log(currentWeek);
      let bookingDate = new Date(booking.year, booking.month - 1, booking.day);
      let bookingWeek = getWeek(bookingDate);
      
			return currentWeek === bookingWeek;
    });
    console.log(filterBookings);
	const firstDay = startOfWeek(selectedDate);
	const lastDay = endOfWeek(selectedDate);
  const dateFormat = 'd';
  let cellId = '';
	let day = firstDay;
	let days = [];
	console.log(firstDay, lastDay);
let times = [];

   
  while (day <= lastDay) {
		for (let i = 0; i < 7; i++) {
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
    timeArray.forEach(time =>
		times.push(
		  <div className='time-block'>
		    {time}
		  </div>,
    ));


  }
  
  //Looping scroll

  const scheduleBody = document.getElementsByClassName('week-container');


return (
  <>
  <Link to='/dashboard/schedule'>Month</Link>
    <div className='week-container'>
      <div className='time-column'>
        {times}
        </div>
        
    <div className='top-row'>
      <div className='week-day-header time'>
        
      </div>
      {days}
      </div>
      {data && filterBookings.map(booking => <WeekBooking booking={booking} key={booking}/>)}
    </div>
  </>
);
};

export default WeekView;