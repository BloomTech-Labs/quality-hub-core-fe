import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { COACH_BOOKINGS, SEEKER_BOOKINGS } from './Queries';
import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

export const DisplayBookings = currentMonth => {
	const { data: bookingsByCoach, refetch: refetchCoaches } = useQuery(COACH_BOOKINGS, {
		variables: { coachId: localStorage.getItem('id') },
	});
	const { data: bookingsBySeeker, refetch: refetchSeekers } = useQuery(SEEKER_BOOKINGS, {
		variables: { seekerId: localStorage.getItem('id') },
	});
	const [renderBookings, setRenderBookings] = useState();

	const localTime = Intl.DateTimeFormat().resolvedOptions().timeZone;

	const convertToLocal = obj => {
		let localAvailDay = obj.day <= 9 ? `0${obj.day}` : `${obj.day}`;
		let localAvailHour = obj.hour < 9 ? `0${obj.hour}` : `${obj.hour}`;
		let localAvailMin = obj.minute === 0 ? '00' : '30';
		let localAvail;
		if (obj.month < 10) {
			localAvail = `${obj.year}-0${obj.month}-${localAvailDay}T${localAvailHour}:${localAvailMin}:00.000Z`;
		} else {
			localAvail = `${obj.year}-${obj.month}-${localAvailDay}T${localAvailHour}:${localAvailMin}:00.000Z`;
		}
		let zoned = utcToZonedTime(localAvail, localTime);
		let zonedArr = format(zoned, 'yyyy M d H mm').split(' ');

		let zonedDate = {
			...obj,
			year: Number(zonedArr[0]),
			month: Number(zonedArr[1]),
			day: Number(zonedArr[2]),
			hour: Number(zonedArr[3]),
			minute: Number(zonedArr[4]),
		};

		return zonedDate;
	};

	useEffect(() => {
		refetchCoaches();
		refetchSeekers();
		if (bookingsBySeeker && bookingsByCoach) {
			// const allBooking = bookingsBySeeker.bookingsBySeeker.join(bookingsByCoach.bookingsByCoach)
			// const convertedArr = allBooking.map(booking => convertToLocal(booking));
			// setRenderBookings(convertedArr)
			setRenderBookings([
				...bookingsBySeeker.bookingsBySeeker,
				...bookingsByCoach.bookingsByCoach,
			]);
		}
	}, [bookingsByCoach, bookingsBySeeker, currentMonth]);

	const sortBookingsFunction = array => {
		array.sort((a, b) => {
			if (a.hour > b.hour) {
				return 1;
			} else if (b.hour > a.hour) {
				return -1;
			} else if (a.minute > b.minute) {
				return 1;
			} else {
				return -1;
			}
		});
		return array;
	};

	const renderPerCell = (array, i) => {
		let counter = 0;

		array.forEach(appt => {
	  const localAppt = convertToLocal(appt);
      if (Number(format(currentMonth, 'M')) == localAppt.month){
			
			if (localAppt.day === i && counter < 2) {
				counter++;
				const apptId = `${localAppt.month}-${localAppt.day}`;
				const booking = document.getElementById(apptId);
				//  if (booking && index <= 52) {
				const div = document.createElement('div');
				div.setAttribute('class', 'coach-booking');
				div.textContent = `InterviewQ ${
					localAppt.hour === 0 ? 12 : localAppt.hour
				}:${localAppt.minute === 0 ? '00' : '30'}`;
				if (booking) {
					booking.appendChild(div);
				}
				//  } else if (booking && index === 3) {
				//  const div = document.createElement('div');
				//  div.setAttribute('class', 'seeker-booking');
				//  div.textContent = `...`;
				//  return booking.appendChild(div);
				//  }
				//  return null
			} else if (appt.day === i &&  counter === 2) {
				//const localAppt = convertToLocal(appt);
				const apptId = `${appt.month}-${appt.day}`;
				const booking = document.getElementById(apptId);
				const div = document.createElement('div');
				div.setAttribute('class', 'seeker-booking');
				div.textContent = `more..`;
				if (booking) {
					
					booking.appendChild(div);
				}
				counter++;
			}
		}
    });
	};

	useEffect(() => {
		let sortBookings;
		if (renderBookings) {
			sortBookings = sortBookingsFunction(renderBookings);
		}
		if (renderBookings && sortBookings) {
			let counter = 0;
			for (let i = 1; i < 32; i++) {
				renderPerCell(sortBookings, i);

			}
		}
	}, [renderBookings]);
};