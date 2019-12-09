import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_BOOKING } from './Resolvers.js';
import { format } from 'date-fns';

const ConfirmInterview = ({ booking, history }) => {


  const [newBooking] = useMutation(CREATE_BOOKING);

  const submitBooking = () => {
    newBooking({ variables: booking })
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