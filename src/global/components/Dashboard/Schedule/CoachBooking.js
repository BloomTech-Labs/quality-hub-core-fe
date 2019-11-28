import React, { useState } from 'react';
import { useQuery } from "@apollo/react-hooks";
import { COACH_BOOKINGS, SEEKER_BOOKINGS } from './Queries'

export const CoachBooking = () => {

// console.log(localStorage.getItem('id'))

const { data: bookingsByCoach } = useQuery(COACH_BOOKINGS, {variables: {coachId: localStorage.getItem('id')}});

// const { data: bookingsBySeeker } = useQuery(SEEKER_BOOKINGS, {variables: {seekerId: localStorage.getItem('id')}});

// console.log(bookingsByCoach);

  // const bookingsByCoach = [
  //   {
  //     "year": 2019,
  //     "month": 11,
  //     "day": 25,
  //     "hour": 4,
  //     "minute": 30,
  //     "coach": {
  //       "first_name": "Julie",
  //       "email": "julie123@lambda.com",
  //       "id": "ck34qxshk000e0796rsdew5t3"
  //     },
  //     "seeker": {
  //       "first_name": "CleverOscar",
  //       "email": "asdf",
  //       "id": "ck2pddqr100030766fg7560s8"
  //     }
  //   },
  //   {
  //     "year": 2019,
  //     "month": 11,
  //     "day": 22,
  //     "hour": 4,
  //     "minute": 30,
  //     "coach": {
  //       "first_name": "Julie",
  //       "email": "julie123@lambda.com",
  //       "id": "ck34qxshk000e0796rsdew5t3"
  //     },
  //     "seeker": {
  //       "first_name": "CleverOscar",
  //       "email": "asdf",
  //       "id": "ck2pddqr100030766fg7560s8"
  //     }
  //   }
  // ]

  const [counter, setCounter] = useState(0);

  //   const apptArray = bookingsByCoach.map(booking => {
	// 	return new Date(
	// 		booking.year,
	// 		booking.month - 1,
	// 		booking.day,
	// 		booking.hour,
	// 		booking.minute,
	// 	);
	// });

  // const apptArray = bookingsByCoach.map(booking => {
	// 	return new Date(
	// 		booking.year,
	// 		booking.month - 1,
	// 		booking.day,
	// 		booking.hour,
	// 		booking.minute,
	// 	);
	// });
	// console.log(apptArray);
	// const checkArray = apptArray.map(appt => format(appt, 'Md'));

  // console.log(checkArray);
  const coachAppts = () => bookingsByCoach && bookingsByCoach.bookingsByCoach.map(appt => {
    const apptId = `${appt.month}${appt.day}`;
    const booking = document.getElementById(apptId);
    
		if (booking && counter === 0) {
			setCounter(1);
			const div = document.createElement('div');
			div.setAttribute('class', 'coach-booking');
			div.textContent = `InterviewQ ${appt.hour}:${appt.minute}`;
			return booking.appendChild(div);
		}
  });
  
  coachAppts();

  // const seekerAppts = () => bookingsBySeeker && bookingsBySeeker.bookingsBySeeker.map(appt => {
  //   const apptId = `${appt.month}${appt.day}`;
  //   const booking = document.getElementById(apptId);
    
	// 	if (booking && counter === 0) {
	// 		setCounter(1);
	// 		const div = document.createElement('div');
	// 		div.setAttribute('class', 'seeker-booking');
	// 		div.textContent = `InterviewQ ${appt.hour}:${appt.minute}`;
	// 		return booking.appendChild(div);
	// 	}
  // });
  
  // seekerAppts();
    
	// const func = async () => {
	// 	const apptCell = checkArray.map(appt => {
	// 		console.log(document.getElementById(appt));
	// 		return document.getElementById(appt).appendChild(document.createElement('div'));
	// 	});
	// 	console.log(apptCell);
	// 	// apptCell.forEach(async cell => await cell.appendChild(document.createElement('div')));
	// };

	// func();

// const addBooking = () => {
// 	// const apptCell = checkArray.map(appt => {
//   //   console.log(document.getElementById(appt))
// 	// 	return document.getElementById(appt);
// 	// });
// 	console.log(apptCell);
// 	apptCell.map(cell => {
// 		console.log(cell);
// 		return cell.appendChild('div');
// 	});
// };
// addBooking();
  return(
    <div></div>
  )
}

export default CoachBooking;