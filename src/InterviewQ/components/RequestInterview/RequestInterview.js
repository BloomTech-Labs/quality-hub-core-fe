import React, { useState, useEffect } from 'react';
import SmallCalendar from '../../../global/components/Calendar/SmallCalendar';
import { Link } from 'react-router-dom';
import { format, getMonth } from 'date-fns';
import { useQuery } from '@apollo/react-hooks';
import { GET_AVAILABILITIES } from './Resolvers';
import './RequestInterview.scss';

const RequestInteview =(props) => {

const coachId = props.match.params.coachId
const { data: availabilities, refetch } = useQuery(GET_AVAILABILITIES, {variables: {coach_id: coachId}});

const [currentSlots, setCurrentSlots] = useState();
const [setter, setSetter] = useState(true);
const [selectedCell, setSelectedCell] = useState(new Date());
const [dateAvails, setDateAvails] = useState();
const [currentMonth, setCurrentMonth] = useState();
const [currentDate, setCurrentDate] = useState();

useEffect(() => {
  setCurrentMonth(getMonth(new Date(selectedCell)) + 1)
  setCurrentDate(Number(format(selectedCell, 'd')));
  setSetter(!setter)
  // props.setBooking({
  //   ...props.booking,
  //   coach: coachId,
  //   year: Number(format(selectedCell, 'yyyy')),
  //   month: (Number(format(selectedCell, 'M'))),
  //   day: Number(format(selectedCell, 'd')),
  // })
  // eslint-disable-next-line
}, [selectedCell]);
const [prevId, setPrevId] = useState();
const createBooking = (e, slot) => {
  setPrevId(e.target.id)
  if (prevId){
    console.log(prevId)
    
  let prevSlot = document.getElementById(prevId)
  prevSlot.className = 'interview-slot'
}
  e.target.className = 'available-slot interview-slot'
  
  const availA = `${coachId}-${slot.year}-${slot.month}-${slot.day}-${slot.start_hour}-${slot.start_minute}`
  const availBMin = slot.minute === 30 ? 0 : 30;
  const availB = `${coachId}-${slot.year}-${slot.month}-${slot.day}-${slot.start_hour}-${availBMin}`

  props.setBooking({
    ...props.booking,
      hour: slot.start_hour,
      minute: slot.start_minute,
      availabilityA: availA,
      availabilityB: availB,
      coach: coachId,
      year: Number(format(selectedCell, 'yyyy')),
      month: (Number(format(selectedCell, 'M'))),
      day: Number(format(selectedCell, 'd')),
  })
}

useEffect(()=> {
  refetch()
// eslint-disable-next-line
}, []
)
 
useEffect(() => {
  availabilities ? setDateAvails(availabilities.availabilitiesByCoach.filter(avail => avail.day === currentDate && avail.month === currentMonth && avail.isOpen === true)) : setDateAvails([])
  // eslint-disable-next-line
}, [setter || availabilities])

useEffect(()=>{
  if(dateAvails){getAvailableSlots()}
  // eslint-disable-next-line
},[dateAvails])

//this will hold all potential 1 hour blocks
let bookingArray = [];
const getAvailableSlots = () => {
  for(let x = 0; x < dateAvails.length-1; x++){
      for (let y = x+1; y < dateAvails.length; y++) {
          if (Math.abs(dateAvails[x].start_hour - dateAvails[y].start_hour) === 0) { //if it's the same hour
              if (dateAvails[x].start_minute < dateAvails[y].start_minute) {
                  bookingArray.push(dateAvails[x]); //if the first date is lower, push that, because it has a full hour availabile
              } else {
              bookingArray.push(dateAvails[y]); //if the second date is lower, push that, because it has a full hour available
              }   

          } else if (Math.abs(dateAvails[x].start_hour - dateAvails[y].start_hour) === 1) { //if the difference between the two is 1, then they are next to each other
            if (dateAvails[x].start_hour < dateAvails[y].start_hour) { //if the first date is lower...

                  if (dateAvails[y].start_minute - dateAvails[x].start_minute === -30) { //if the difference is -30, then the numbers are next to each other
                    bookingArray.push(dateAvails[x]); //push the first date to the bookingArray, because it is lower and has an hour block available
                  } else{ //if the difference is anything but -30, then they are more than an hour apart
                  }
              } else{ //if the second date is lower....
                  if(dateAvails[x].start_minute - dateAvails[y].start_minute === -30){ //if the difference is -30, then you know the numbers are next to each other 
                    bookingArray.push(dateAvails[y]) //push second date, because it is lower and has the hour block
                  } else{ //if the difference is NOT -30, then the blocks are not next to each other, and skip
                  }
              }
          } else { //the hours are not equal or next to each other, so we skip to the next date object
          }
      }
  }
setCurrentSlots(bookingArray);
}
console.log(currentSlots);
return (
	<div className='booking-content-section'>
		<div className='formsection'>
    <div className='interviewq-header-container'>
      <h2>Select a Date</h2>
      </div>
      <div className='interviewq-content-container'>
			<div className='coach-availability'>
				<SmallCalendar
					selectedCell={selectedCell}
					setSelectedCell={setSelectedCell}
				/>
				<div className='interview-slot-list'>
					{currentSlots ? (
						currentSlots.map(time => {
							if (time.isOpen === true) {
								return (
									<div
                    key={time.id}
                    id={time.id}
										className='interview-slot'
										onClick={e => createBooking(e, time)}>
										{time.start_hour > 12
											? time.start_hour - 12
											: time.start_hour}
										:{time.start_minute === 0 ? '00' : '30'}{' '}
										{time.start_hour >= 12 ? 'PM' : 'AM'}
									</div>
								);
							}
							return null;
						})
					) : (
						<p>No availabile bookings today</p>
					)}
				</div>
			</div>

			{props.booking && props.booking.hour ? (
				<p>You've selected {format(new Date(props.booking.year, props.booking.month - 1, props.booking.day, props.booking.hour, props.booking.minute), "PPPP - p ")}</p>
			) : (
				<p> Please select a time slot</p>
			)}
		</div>
    </div>
    <div className="formsection">
    <div className='interviewq-header-container'>
      <h2>Additional Information</h2>
      </div>
      <div className='interviewq-content-container'>
        <div className='interviewq-booking-input'>
      <h3>Resume Upload</h3>
        </div>
        <div className='interviewq-booking-input'>
      <h3>What do you want to get out of mock interviews?</h3>
      <textarea placeholder='e.g. More confidence, preparation for upcoming interview etc....' />
</div>
<div className='interviewq-booking-input'>
      <h3>What kind of interview questions do you want to focus on?</h3>
      <textarea 
      placeholder='e.g. Technical questions, soft skill questions etc' />
    </div>
    </div>
    </div>
    <div className='formsection'>
    <div className='interviewq-header-container'>
   
      <h2>Payment Info</h2>
      <div className='interviewq-content-container'>
      </div>
      </div>
    </div>
    <div className='formsection'>
    {props.booking && props.booking.hour ? (
				<Link to={`/interviewq/booking/${coachId}/confirm`}>
					<button className='interview-button'>Next</button>
				</Link>
			) : (
				<p> Please select a time slot</p>
			)}
      </div>
	</div>
);
};

export default RequestInteview;