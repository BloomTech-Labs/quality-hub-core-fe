import React from 'react';
import { ALL_BOOKINGS } from './Queries';
import { useQuery } from "@apollo/react-hooks";
import { format } from 'date-fns';
import { clock } from '../../../../globalIcons/Clock.js';
import { ICONS } from '../../../../globalIcons/iconConstants';
import Icon from '../../../../globalIcons/Icon';
import { utcToZonedTime } from 'date-fns-tz';

const CalendarDetail = ({ selectedDate,  setOpen }) => { //handleOutsideClick,
const { data } = useQuery(ALL_BOOKINGS, {variables: {seekerId: localStorage.getItem('id'), coachId: localStorage.getItem('id')}});

const allBookings = data.bookingsByCoach.concat(data.bookingsBySeeker);
const localTime = Intl.DateTimeFormat().resolvedOptions().timeZone;

console.log(data)
// const selectedMonth = format(selectedDate, 'M');
  const selectedDay = format(selectedDate, 'd');

const booking = data && allBookings.filter(month => {return month.day === Number(selectedDay)});
// console.log(booking)
// const coachBooking = data && booking.filter(booking => booking.coach.id === localStorage.getItem('id'));
// console.log('coachBooking', coachBooking)
// const seekerBooking = data && booking.filter(booking => booking.seeker.id === localStorage.getItem('id'));
const convertToLocal = (obj) => {
  console.log(obj)
  let localAvailDay = obj.day <= 9 ? `0${obj.day}` : `${obj.day}`
  let localAvailHour = obj.hour < 9 ? `0${obj.hour}` : `${obj.hour}`
  let localAvailMin = obj.minute === 0 ? '00' : '30'
	let localAvail = `${obj.year}-${obj.month}-${localAvailDay}T${localAvailHour}:${localAvailMin}:00.000Z`;
	console.log(localAvail)
  let zoned = utcToZonedTime(localAvail, localTime);
  console.log(zoned)
  let zonedArr = format(zoned, 'yyyy M d H mm').split(' ');

  let zonedDate = {
    ...obj,
    year: Number(zonedArr[0]),
    month: Number(zonedArr[1]),
    day: Number(zonedArr[2]),
    hour: Number(zonedArr[3]),
    minute: Number(zonedArr[4])
    
  }

  return zonedDate
}
return (
	<>
  <span className='cal-detail-header' onClick={() => setOpen(false)}>X</span>
		{booking[0] ? (
			<div>
				{booking.map((info, index) => {
					const localInfo = convertToLocal(info)
					// console.log(info)
					// console.log(localInfo)
					return info.coach.id === localStorage.getItem('id') ? (
						<div className = "coach-detail" key={index}>
							<h3>
								<span>&#x25FC;</span> InterviewQ
							</h3>
							<p>
								<Icon
									icon={ICONS.PERSONALINFO}
									width={15}
									height={15}
									color='#777'
								/>
								{info.seeker.first_name} {info.seeker.last_name}
							</p>
							<p>		&#x2709;
                {info.seeker.email}</p>
							<p>{clock()} {format((new Date(localInfo.year, localInfo.month -1, localInfo.day, localInfo.hour, localInfo.minute)), "PPPP - p ")}</p>
							{/* <button className='default-btn' onClick={() => setOpen(false)}>
								done
							</button> */}
						</div>
					) : (
						<div className= "seeker-detail" key={index}>
							<h3>
								<span>&#x25FC;</span> InterviewQ
							</h3>
							<p>
								<Icon
									icon={ICONS.PERSONALINFO}
									width={15}
									height={15}
									color='#777'
								/>
								{info.coach.first_name} {info.coach.last_name}
							</p>
							<p>&#x2709;{info.coach.email}</p>
							<p>{clock()} {format((new Date(localInfo.year, localInfo.month -1, localInfo.day, localInfo.hour, localInfo.minute)), "PPPP - p ")}</p>
							{/* <button className='default-btn' }>
								done
							</button> */}
						</div>
					);
				})}
			</div>
		) : (
			<div>
				<h3>No bookings</h3>
			
			</div>
		)}
    	{/* <button className='default-btn' onClick={() => setOpen(false)}>
					done
				</button> */}
	</>
);

}

export default CalendarDetail;