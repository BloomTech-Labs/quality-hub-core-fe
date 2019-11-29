import React from 'react';
import { ALL_BOOKINGS } from './Queries';
import { useQuery } from "@apollo/react-hooks";
import { format } from 'date-fns';

const CalendarDetail = ({ selectedDate, handleOutsideClick, setOpen }) => {
const { data } = useQuery(ALL_BOOKINGS, {variables: {seekerId: localStorage.getItem('id'), coachId: localStorage.getItem('id')}});

const allBookings = data.bookingsByCoach.concat(data.bookingsBySeeker);


console.log(data)
const selectedMonth = format(selectedDate, 'M');
  const selectedDay = format(selectedDate, 'd');

const booking = data && allBookings.filter(month => {return month.day === Number(selectedDay)})
console.log(booking)
return(
  <>{booking[0] ? <div>{booking.map(info => {
    return <div>
      <h3>{info.hour}:{info.minute}</h3>
      <p>Seeker: {info.seeker.first_name} {info.seeker.last_name}</p>
      <p>{info.seeker.email}</p>
      <p>Coach: {info.coach.first_name} {info.coach.last_name}</p>
      <p>{info.coach.email}</p>
      <button className='default-btn' onClick={() => setOpen(false)}>done</button>
      </div>
})}</div> : <div><h3>No bookings</h3>
<button className='default-btn' onClick={() => setOpen(false)}>done</button></div>}</>
)

}

export default CalendarDetail;