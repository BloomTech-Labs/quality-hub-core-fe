import React, {useState, useEffect} from 'react';
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
	getDate,
	getMonth,
	localTime,
	// utcToZonedTime
	// convertToLocal,
	// currentDate
} from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

const SmallCells = ({ onDateClick, currentMonth, selectedDate, availabilities }) => {

	const [allTheAvails, setAllTheAvails] = useState();
	const localTime = Intl.DateTimeFormat().resolvedOptions().timeZone;
	let integerMonth = getMonth(currentMonth) + 1;
	
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

	const convertToLocal = (obj) => {
		let localAvailDay = obj.day <= 9 ? `0${obj.day}` : `${obj.day}`
		let localAvailHour = obj.start_hour <= 9 ? `0${obj.start_hour}` : `${obj.start_hour}`
		let localAvailMin = obj.start_minute === 0 ? '00' : '30'
		let localAvail;
		if(obj.month < 10){
			localAvail = `${obj.year}-0${obj.month}-${localAvailDay}T${localAvailHour}:${localAvailMin}:00.000Z`;
		  } else{
			localAvail = `${obj.year}-${obj.month}-${localAvailDay}T${localAvailHour}:${localAvailMin}:00.000Z`;
		  }
		let zoned = utcToZonedTime(localAvail, localTime);
		let zonedArr = format(zoned, 'yyyy M d H mm').split(' ');
		let zonedDate = {
		  ...obj,
		  year: Number(zonedArr[0]),
		  month: Number(zonedArr[1]),
		  day: Number(zonedArr[2]),
		  start_hour: Number(zonedArr[3]),
		  start_minute: Number(zonedArr[4])
		  
		}
		return zonedDate
	  }


	const getAvailableSlots = (dateAvails) => {
		let bookingArray = [];
  for(let x = 0; x < dateAvails.length-1; x++){
	  for (let y = x+1; y < dateAvails.length; y++) {
		  if(dateAvails[x].day === dateAvails[y].day){

		  
		//   if(dateAvails[x].month == integerMonth && dateAvails[y].month == integerMonth){
          if (Math.abs(dateAvails[x].start_hour - dateAvails[y].start_hour) === 0) { //if it's the same hour
              if (dateAvails[x].start_minute < dateAvails[y].start_minute) {
                  bookingArray.push(dateAvails[x]); //if the first date is lower, push that, because it has a full hour availabile
              } else {
              bookingArray.push(dateAvails[y]); //if the second date is lower, push that, because it has a full hour available
              }   

          } else if (Math.abs(dateAvails[x].start_hour - dateAvails[y].start_hour) === 1) { //if the difference between the two is 1, then they are next to each other
            if (dateAvails[x].start_hour < dateAvails[y].start_hour) { //if the first date is lower...

                  if (dateAvails[y].start_minute - dateAvails[x].start_minute === -30) { //if the difference is -30, then the numbers are next to each other
                    bookingArray.push(dateAvails[x]); //push the first date to the bookingArray, because it is lower and has an hour block available
                  } else{ //if the difference is anything but -30, then they are more than an hour apart
                  }
              } else{ //if the second date is lower....
                  if(dateAvails[x].start_minute - dateAvails[y].start_minute === -30){ //if the difference is -30, then you know the numbers are next to each other 
                    bookingArray.push(dateAvails[y]) //push second date, because it is lower and has the hour block
                  } else{ //if the difference is NOT -30, then the blocks are not next to each other, and skip
                  }
              }
          } else { //the hours are not equal or next to each other, so we skip to the next date object
          }
	  }
	}
  }
  // let localTimeArray = bookingArray.map(booking => convertToLocal(booking))
//   console.log(availabilities)
// console.log(bookingArray);

setAllTheAvails(bookingArray);
}

useEffect(()=>{
	if(availabilities){
		// console.log(availabilities)
		let someArray = availabilities.availabilitiesByCoach.map(avail => convertToLocal(avail)).filter(avail => avail.month === integerMonth && avail.isOpen === true);
		// console.log(someArray);

		getAvailableSlots(someArray);
	}
},[availabilities]);

	const availsExist = someDate =>{
		let integerDate = getDate(someDate);
		let match = false;
		if(allTheAvails){

			// for(let i = 0; i < availabilities.availabilitiesByCoach.length; i++){
			// 	if(availabilities.availabilitiesByCoach[i].month === integerMonth && availabilities.availabilitiesByCoach[i].day === integerDate){
			// 		match = true;
			// 		break
			// 	}
			// }

			for(let i = 0; i < allTheAvails.length; i++){
				if(allTheAvails[i].month === integerMonth && allTheAvails[i].day === integerDate){
					match = true;
					break
				}
			}
			
			return match;
		}
	}
	while (day <= endDate) {
		for (let i = 0; i < 7; i++) {
			formattedDate = format(day, dateFormat);
			cellId = format(day, 'Md');
			const cloneDay = day;
			// console.log(availsExist(day));
			// {availabilities && console.log(availsExist(day))}
			days.push(
				<div
					id={cellId}
					className={`small-col small-cell`} //classname conditional here for light blue
					key={day}
					onClick={() => onDateClick(toDate(cloneDay))}>
						
					<div className={`number ${
						!isSameMonth(day, monthStart)
							? 'disabled'
							: isSameDay(day, selectedDate)
							? 'small-selected'
							: availsExist(day) ? 'match-light-blue' : ''
							// : availsExist(day) ? 'match-light-blue' : ''
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
