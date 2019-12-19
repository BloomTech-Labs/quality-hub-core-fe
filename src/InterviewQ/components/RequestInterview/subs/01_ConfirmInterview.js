import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks';
import { CREATE_BOOKING } from './Resolvers';
import { format } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';
import ConfirmedInterview from './02_ConfirmedInterview';
//import { convertToUTC } from '../../../../global/utils/TZHelpers'

const ConfirmInterview = ({ booking, history, match, selectedCell, coachName }) => {
	const coachId = match.params.coachId;
  console.log(booking)
  const localTime = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const convertToUTC = (obj) => {
    let localAvail = new Date(obj.year, obj.month - 1, obj.day, obj.hour, obj.minute)
    //  console.log(localAvail)
    let utc = zonedTimeToUtc(localAvail, localTime);
    // console.log(utc)
    let utcArr = utc.toISOString().split(/[T:-]/g);
    // console.log(utcArr);
    const availAMin = obj.minute === 30 ? 30 : 0;
    const availAHour = utcArr[3].charAt(0) === '0' ? utcArr[3].substr(1, 1) : utcArr[3];
    
    const availAMonth = utcArr[2].charAt(0) === '0' ? utcArr[2].substr(1, 1) : utcArr[2];
 
    if(utcArr[1].charAt(0)==="0"){
      utcArr[1]=utcArr[1].charAt(1);
    }
    const availA = `${obj.coach}-${utcArr[0]}-${utcArr[1]}-${availAMonth}-${availAHour}-${availAMin}`
    const availBMin = availAMin === 30 ? 0 : 30;
    const availBHour = availBMin === 30 ? availAHour : Number(availAHour) + 1;
    // const availB = `${obj.coach}-${utcArr[0]}-${8}-${availAMonth}-${availBHour}-${availBMin}`
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
    // console.log(UTCdate)
    return UTCdate
  }

  const node = useRef();
  const [open, setOpen] = useState(false);
  
  const [newBooking, { client }] = useMutation(CREATE_BOOKING);

  const submitBooking = () => {
    const utcBooking = convertToUTC(booking)
    console.log(utcBooking)
    newBooking({ variables: utcBooking })
  .then(res => {
    client.clearStore();
    setOpen(true)
    // setDateAvails([...dateAvails, availability])
    console.log('successful post')
    //history.push('/interviewq/interviewconfirmed')
  })
  .catch(err => console.log(err))
  }
  let bookingDate = '';
  if(booking){
  if(booking.year){

    // const { year, month, day, hour, minute } = booking;

    bookingDate = format(new Date(booking.year, booking.month - 1, booking.day, booking.hour, booking.minute), "PPPP - p ");
  console.log(bookingDate)
  	//This sets the darkened overlay behind the modals
   
  }
}

useEffect(() => {
  if (open === true) {
    document.getElementById('overlay-confirm-interview').style.display = 'block';
  }  else {
    document.getElementById('overlay-confirm-interview').style.display = 'none';
  }
}, [open]);
  return(
    <div className='booking-content-section'>
      <div id='overlay-confirm-interview'></div>
    <div className='formsection'>
    <div className='interviewq-header-container interviewq-conf-heading'>
      <h2 className='booking-first-header'>Confirmation</h2>
      </div>
      <p> Please review the details of your mock interview, and click 'Confirm' to schedule it with your coach!</p>
      <div className='interviewq-content-container interviewq-conf-container'>
      <div className='interviewq-conf-section'>
      <h3>Coach</h3> <p>{booking.coachName}</p>
      </div>
      <div className='interviewq-conf-section'>
   <h3>Date</h3> <p> {bookingDate}</p>
   </div>
   <div className='interviewq-conf-section'>
   <h3>What do you want to get out of mock interviews?</h3>
   <p>{booking.interviewGoals}</p>
   </div>
   <div className='interviewq-conf-section'>
   <h3>What kind of interview questions do you want to focus on?</h3>
   <p>{booking.interviewQuestions}</p>
   </div>
   </div>
   <div className='booking-button-container'>
   <Link className="interview-a-secondary" to={`/interviewq/booking/${coachId}/`}>
     <button className='interview-button-secondary'><p>Back</p></button>
     </Link>
   <button className='book-interview-button' onClick={submitBooking}><p>Confirm</p></button>
   </div>
   </div>

   {open && (
				<div className='confirmed-interview-modal'>
					<ConfirmedInterview
					node = {node}
						setOpen={setOpen}
						//selectedDate={selectedDate}
					/>
			</div>
			)}	

</div>
    
  )
}

export default ConfirmInterview;