import React, { useState } from 'react';
import { useQuery } from "@apollo/react-hooks";
import {  SEEKER_BOOKINGS } from './Queries'

const SeekerBookings = () => {
const { data: bookingsBySeeker } = useQuery(SEEKER_BOOKINGS, {variables: {seekerId: localStorage.getItem('id')}});

const [counter, setCounter] = useState(0);

const seekerAppts = () => bookingsBySeeker && bookingsBySeeker.bookingsBySeeker.map(appt => {
  const apptId = `${appt.month}${appt.day}`;
  const booking = document.getElementById(apptId);
  
  if (booking && counter === 0) {
    setCounter(1);
    const div = document.createElement('div');
    div.setAttribute('class', 'seeker-booking');
    div.textContent = `InterviewQ ${appt.hour}:${appt.minute}`;
    return booking.appendChild(div);
  }
});

seekerAppts();

return(<></>)
}

export default SeekerBookings;