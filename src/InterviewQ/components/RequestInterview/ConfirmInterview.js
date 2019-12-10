import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_BOOKING } from './Resolvers.js';
import { format } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';

const ConfirmInterview = ({ booking, history }) => {

  const localTime = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const convertToUTC = (obj) => {
    let localAvail = new Date(obj.year, obj.month - 1, obj.day, obj.hour, obj.minute)
     console.log(localAvail)
    let utc = zonedTimeToUtc(localAvail, localTime);
    // console.log(utc)
    let utcArr = utc.toISOString().split(/[T:-]/g);
    // console.log(utcArr);
    const availAMin = obj.minute === 30 ? 30 : 0;
    const availAHour = utcArr[3].charAt(0) === '0' ? utcArr[3].substr(1, 1) : utcArr[3];
    console.log(utcArr[3].substr(1));
    const availAMonth = utcArr[2].charAt(0) === '0' ? utcArr[2].substr(1, 1) : utcArr[2];
    const availA = `${obj.coach}-${utcArr[0]}-${utcArr[1]}-${availAMonth}-${availAHour}-${availAMin}`
    
    const availBMin = availAMin === 30 ? 0 : 30;
    const availBHour = availBMin === 30 ? availAHour : Number(availAHour) + 1;
    const availB = `${obj.coach}-${utcArr[0]}-${utcArr[1]}-${availAMonth}-${availBHour}-${availBMin}`
    let UTCdate = {
      ...obj,
      availabilityA: availA,
      availabilityB: availB,
      year: Number(utcArr[0]),
      month: Number(utcArr[1]),
      day: Number(utcArr[2]),
      hour: Number(utcArr[3]),
      minute: Number(utcArr[4])
    }
    console.log(UTCdate)
    return UTCdate
  }

  const [newBooking] = useMutation(CREATE_BOOKING);

  const submitBooking = () => {
    const utcBooking = convertToUTC(booking)
    newBooking({ variables: utcBooking })
  .then(res => {
    // setDateAvails([...dateAvails, availability])
    console.log('successful post')
    history.push('/interviewq/interviewconfirmed')
  })
  .catch(err => console.log(err))
  }
  let bookingDate = '';
  if(booking){
  if(booking.year){

    // const { year, month, day, start_hour, start_minute } = booking;

    bookingDate = format(new Date(booking.year, booking.month - 1, booking.day, booking.hour, booking.minute), "PPPP - p ");
  console.log(bookingDate)
  }
}
  return(
    <div className='booking-content-section'>
    <div className='formsection'>
    <div className='interviewq-header-container'>
      <h2>Interview Appointment Confirmation</h2>
      </div>
      <div className='interviewq-booking-input'>
      
   <h3>Your booking will be scheduled for {bookingDate}</h3>
   </div>
   <div className='interviewq-booking-input'>
   <h3>What do you want to get out of mock interviews?</h3>
   </div>
   <div className='interviewq-booking-input'>
   <h3>What kind of interview questions do you want to focus on?</h3>
   </div>
   <button className='interview-button' onClick={submitBooking}>Submit</button>
   </div>
</div>
    
  )
}

export default ConfirmInterview;