import React, { useState, useEffect } from 'react';
import { useQuery } from "@apollo/react-hooks";
import {  SEEKER_BOOKINGS } from './Queries'

export const SeekerBooking = (currentMonth) => {

const { data: bookingsBySeeker } = useQuery(SEEKER_BOOKINGS, {variables: {seekerId: localStorage.getItem('id')}});


useEffect(() => {
  bookingsBySeeker && bookingsBySeeker.bookingsBySeeker.map(appt => {
  const apptId = `${appt.month}${appt.day}`;
  const booking = document.getElementById(apptId);
  
  if (booking) {
    const div = document.createElement('div');
    div.setAttribute('class', 'seeker-booking');
    div.textContent = `InterviewQ ${appt.hour}:${appt.minute}`;
    return booking.appendChild(div);
  }
});
}, [currentMonth, bookingsBySeeker]);

}
