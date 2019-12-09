import { useEffect, useState } from 'react';
import { useQuery } from "@apollo/react-hooks";
import {  SEEKER_BOOKINGS } from './Queries'

export const SeekerBooking = (currentMonth) => {

const { data: bookingsBySeeker } = useQuery(SEEKER_BOOKINGS, {variables: {seekerId: localStorage.getItem('id')}});

const [counter, setCounter] = useState(0);

useEffect(() => {
	bookingsBySeeker &&
		bookingsBySeeker.bookingsBySeeker.map((appt, index) => {
			const apptId = `${appt.month}${appt.day}`;
			const booking = document.getElementById(apptId);

			if (booking && index <= 2) {
				const div = document.createElement('div');
				div.setAttribute('class', 'seeker-booking');
				div.textContent = `InterviewQ ${appt.hour}:${appt.minute}`;
				setCounter(counter + 1);
				return booking.appendChild(div);
			} else if (booking && index === 3) {
				const div = document.createElement('div');
				div.setAttribute('class', 'seeker-booking');
				div.textContent = `...`;
				setCounter(counter + 1);
				return booking.appendChild(div);
			}
			return null;
    });
    // eslint-disable-next-line
}, [currentMonth, bookingsBySeeker]);
}
