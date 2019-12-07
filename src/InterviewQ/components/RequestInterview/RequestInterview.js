import React, { useState, useEffect } from 'react';
import SmallCalendar from '../../../global/components/Calendar/SmallCalendar';
import { gql } from 'apollo-boost';
import { format, getMonth, getTime, getHours, getMinutes } from 'date-fns';
import { useQuery } from '@apollo/react-hooks';
import { GET_AVAILABILITIES } from './Resolvers';
import { timeObjs } from '../../../global/components/Dashboard/Schedule/TimeArrays';
import './RequestInterview.scss';

const RequestInteview =(props) => {

const coachId = props.match.params.coach_id
const { data: availabilities, refetch } = useQuery(GET_AVAILABILITIES, {variables: {coach_id: coachId}});
  // console.log(availabilities);
  // console.log(coachId)
const [ohlawdanotherone, setOhlawdanotherone] = useState();
const [setter, setSetter] = useState(true);
const [selectedCell, setSelectedCell] = useState(new Date());
const [dateAvails, setDateAvails] = useState();
const [dateObjs, setDateObjs] = useState([]);
const [currentMonth, setCurrentMonth] = useState();
const [currentDate, setCurrentDate] = useState();
const [booking, setBooking] = useState({
    recurring: false,
  });



useEffect(() => {
  setCurrentMonth(getMonth(new Date(selectedCell)) + 1)
  setCurrentDate(Number(format(selectedCell, 'd')));
  setSetter(!setter)
}, [selectedCell]);

useEffect(() => {
  setBooking({
    ...booking,
    year: Number(format(selectedCell, 'yyyy')),
    month: (Number(format(selectedCell, 'M'))),
    day: Number(format(selectedCell, 'd')),
  })
}, [selectedCell]);



const timeFilter = (hour, min) => {
  let returnvar = false;
  (availabilities && dateAvails) &&
    dateAvails.forEach(({ start_hour, start_minute }) => {
      if (start_hour === hour && start_minute === min) {
        returnvar = true;
      }
    });
  return returnvar;
};

const createAvail = (hour, minute) => {
  setBooking({
   ...booking,
    start_hour: hour,
    start_minute: minute,
  })
  
  let newObj= {...booking,
    start_hour: hour,
    start_minute: minute,
  };
  // console.log(newObj)
  // console.log(dateAvails)
  // newAvail({ variables: newObj })
  //   .then(res => {
  //     refetch();
  //     // setDateAvails([...dateAvails, availability])
  //     console.log('successful post')
  //   })
  //   .catch(err => console.log(err))
}

const deleteAvail = (h, m) => {
  let checkvar = {
    uniquecheck: `${localStorage.getItem('id')}-${format(selectedCell, 'yyyy')}-${currentMonth}-${currentDate}-${h}-${m}`
  };
  // removeAvail({ variables: checkvar })
  // .then(res => {
  //   refetch();
  //   console.log('deleted', checkvar)
  // })
  // .catch(err => console.log(err))
}

const toggleAvail = (e, h, m) => {
  if(e.target.className === 'available-slot interview-slot'){
    deleteAvail(h, m)
    e.target.className = 'unavailable-to-book';
    return
  }
  createAvail(h, m)
  e.target.className = 'available-slot interview-slot';     
};


useEffect(() => {
  availabilities ? setDateAvails(availabilities.availabilitiesByCoach.filter(avail => avail.day === currentDate && avail.month === currentMonth)) : setDateAvails([])
  //  console.log('maybe a thing', dateAvails, currentDate, currentMonth)
}, [setter || availabilities])

useEffect(() => {
	availabilities && dateAvails
		? setDateObjs(
				dateAvails.map(avail => {
					return {
						startTime: new Date(
							avail.year,
							avail.month - 1,
							avail.day,
							avail.start_hour,
							avail.start_minute,
						),
						endingtime: new Date(
							avail.year,
							avail.month - 1,
							avail.day,
							avail.start_minute === 30
								? avail.start_hour + 1
								: avail.start_hour,
							avail.start_minute === 30 ? 0 : 30,
						),
					};
				})
		  )
		: setDateObjs([]);
	setOhlawdanotherone(dateObjs ? dateObjs.map((date, index) => {
    // console.log(getHours(date.startTime))
    // console.log(getMinutes(date.startTime))
    
    
    return diff_hours(date.endingtime, date.startTime)}
    ) : []
 )
 let bookingArray = []; //this will hold all potential 1 hour blocks
for(let x = 0; x < dateObjs.length-1; x++){
    for (let y = x+1; y < dateObjs.length; y++) {
        if (Math.abs(getHours(dateObjs[x].startTime) - getHours(dateObjs[y].startTime)) == 0) { //if it's the same hour
            if (getMinutes(dateObjs[x].startTime) < getMinutes(dateObjs[y].startTime)) {
                bookingArray.push(dateObjs[x].startTime); //if the first date is lower, push that, because it has a full hour availabile
            } else {
            bookingArray.push(dateObjs[y].startTime); //if the second date is lower, push that, because it has a full hour available
            }
           
        } else if (Math.abs(getHours(dateObjs[x].startTime) - getHours(dateObjs[y].startTime)) == 1) { //if the difference between the two is 1, then they are next to each other
          if (getHours(dateObjs[x].startTime) < getHours(dateObjs[y].startTime)) { //if the first date is lower...

                if (getMinutes(dateObjs[y].startTime) - getMinutes(dateObjs[x].startTime) == -30) { //if the difference is -30, then the numbers are next to each other
                  bookingArray.push(dateObjs[x].startTime); //push the first date to the bookingArray, because it is lower and has an hour block available
                } else{ //if the difference is anything but -30, then they are more than an hour apart
                }
            } else{ //if the second date is lower....
                if(getMinutes(dateObjs[x].startTime) - getMinutes(dateObjs[y].startTime) == -30){ //if the difference is -30, then you know the numbers are next to each other 
                  bookingArray.push(dateObjs[y].startTime) //push second date, because it is lower and has the hour block
                } else{ //if the difference is NOT -30, then the blocks are not next to each other, and skip
                }
            }
        } else { //the hours are not equal or next to each other, so we skip to the next date object
        }
    }
}
console.log(bookingArray)
}, [dateAvails]);

function diff_hours(dt2, dt1) {
  // console.log(dt2)
  var diff =getTime(dt2) - getTime(dt1) / 1000;
  diff /= (60 * 60);
  return Math.abs(Math.round(diff)); 
 }
// console.log(getTime(new Date(2019, 12, 7, 12, 30)))
// console.log(diff_hours(new Date(2018, 12, 7, 1, 30), new Date(2018, 12, 7, 12, 30)))

useEffect(() => {
  // if(availabilities && dateAvails != []){
  // let timeDiffs = dateAvails.map((date) => diff_hours(date.startTime, date.endingtime))
  // console.log(timeDiffs)
  // }
  console.log(dateObjs.slice().sort())
}, [dateObjs])


return(
  <>
  {/* <QNav /> */}
  <div className=' availability-container'>
 
  <div className='coach-availability'>
    <SmallCalendar selectedCell={selectedCell} setSelectedCell={setSelectedCell} />
    <div className='interview-slot-list'>
      {timeObjs.map(time => {
        // console.log('map running')
        return(
          <div key={time.display}  className={`${timeFilter(time.hour, time.minute) ? 'available-slot interview-slot' : 'unavailable-to-book'}`} onClick={e => toggleAvail(e, time.hour, time.minute)}>
            {time.display}
          </div>
        )
      })}
    </div>
    </div>
  </div>
  </>
)
};

export default RequestInteview;