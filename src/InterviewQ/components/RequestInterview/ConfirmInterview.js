import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_BOOKING } from './Resolvers.js';
import { format } from 'date-fns';

const ConfirmInterview = ({ booking }) => {


  const [newBooking] = useMutation(CREATE_BOOKING);

  const submitBooking = () => {
    newBooking({ variables: booking })
  .then(res => {
    // setDateAvails([...dateAvails, availability])
    console.log('successful post')
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
    <div className='confirm-interview-booking formsection'>
   <h3>Your booking is scheduled for {bookingDate}</h3>
   <button onClick={submitBooking}>Submit</button>

    </div>
  )
}

export default ConfirmInterview;