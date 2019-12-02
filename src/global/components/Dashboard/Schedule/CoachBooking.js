import React, { useEffect } from 'react';
import { useQuery } from "@apollo/react-hooks";
import { COACH_BOOKINGS } from './Queries'

export const CoachBooking = (currentMonth) => {

const { data: bookingsByCoach } = useQuery(COACH_BOOKINGS, {variables: {coachId: localStorage.getItem('id')}});

  useEffect(() => {
   bookingsByCoach && bookingsByCoach.bookingsByCoach.map(appt => {
    const apptId = `${appt.month}${appt.day}`;
    const booking = document.getElementById(apptId);
		if (booking) {
			const div = document.createElement('div');
			div.setAttribute('class', 'coach-booking');
			div.textContent = `InterviewQ ${appt.hour}:${appt.minute}`;
			return booking.appendChild(div);
    }
  });
}, [currentMonth, bookingsByCoach])

}
