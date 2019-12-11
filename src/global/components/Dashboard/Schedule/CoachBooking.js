import { useEffect, useState } from 'react';
import { useQuery } from "@apollo/react-hooks";
import { COACH_BOOKINGS } from './Queries'
import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

export const CoachBooking = (currentMonth) => {

const { data: bookingsByCoach, refetch } = useQuery(COACH_BOOKINGS, {variables: {coachId: localStorage.getItem('id')}});

const [counter, setCounter] = useState(0);

const localTime = Intl.DateTimeFormat().resolvedOptions().timeZone;

const convertToLocal = (obj) => {
  console.log(obj)
  let localAvailDay = obj.day <= 9 ? `0${obj.day}` : `${obj.day}`
  let localAvailHour = obj.hour < 9 ? `0${obj.hour}` : `${obj.hour}`
  let localAvailMin = obj.minute === 0 ? '00' : '30'
  let localAvail;
	if(obj.month < 10){
    localAvail = `${obj.year}-0${obj.month}-${localAvailDay}T${localAvailHour}:${localAvailMin}:00.000Z`;
  } else{
    localAvail = `${obj.year}-${obj.month}-${localAvailDay}T${localAvailHour}:${localAvailMin}:00.000Z`;
  }
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

  useEffect(() => {
   bookingsByCoach && bookingsByCoach.bookingsByCoach.map((appt, index) => {
     const localAppt = convertToLocal(appt);
    const apptId = `${appt.month}${appt.day}`;
    const booking = document.getElementById(apptId);
		if (booking && index <= 32) {
			const div = document.createElement('div');
			div.setAttribute('class', 'coach-booking');
			div.textContent = `InterviewQ ${localAppt.hour === 0 ? 12 : localAppt.hour}:${localAppt.minute === 0 ? '00' : '30'}`;
			return booking.appendChild(div);
    } else if (booking && index === 3) {
      const div = document.createElement('div');
      div.setAttribute('class', 'seeker-booking');
      div.textContent = `...`;
      setCounter(counter + 1);
      return booking.appendChild(div);
    }
    return null
  });
  // eslint-disable-next-line
}, [currentMonth, bookingsByCoach])

}
