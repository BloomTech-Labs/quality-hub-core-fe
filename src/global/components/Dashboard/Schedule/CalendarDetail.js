import React from 'react';
import { ALL_BOOKINGS } from './Queries';
import { useQuery } from "@apollo/react-hooks";
import { format } from 'date-fns';
import { clock } from '../../../../globalIcons/Clock.js';
import { ICONS } from '../../../../globalIcons/iconConstants';
import Icon from '../../../../globalIcons/Icon';

const CalendarDetail = ({ selectedDate, handleOutsideClick, setOpen }) => {
const { data } = useQuery(ALL_BOOKINGS, {variables: {seekerId: localStorage.getItem('id'), coachId: localStorage.getItem('id')}});

const allBookings = data.bookingsByCoach.concat(data.bookingsBySeeker);


console.log(data)
const selectedMonth = format(selectedDate, 'M');
  const selectedDay = format(selectedDate, 'd');

const booking = data && allBookings.filter(month => {return month.day === Number(selectedDay)});
console.log(booking)
// const coachBooking = data && booking.filter(booking => booking.coach.id === localStorage.getItem('id'));
// console.log('coachBooking', coachBooking)
// const seekerBooking = data && booking.filter(booking => booking.seeker.id === localStorage.getItem('id'));

return (
	<>
  <span className='cal-detail-header' onClick={() => setOpen(false)}>X</span>
		{booking[0] ? (
			<div>
				{booking.map(info => {
					return info.coach.id === localStorage.getItem('id') ? (
						<div className = "coach-detail">
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
							<p>{clock()} {format((new Date(info.year, info.month -1, info.day, info.hour, info.minute)), "PPPP - p ")}</p>
							{/* <button className='default-btn' onClick={() => setOpen(false)}>
								done
							</button> */}
						</div>
					) : (
						<div className= "seeker-detail">
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
							<p> 	&#x2709;{info.coach.email}</p>
							<p>{clock()} {format((new Date(info.year, info.month -1, info.day, info.hour, info.minute)), "PPPP - p ")}</p>
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