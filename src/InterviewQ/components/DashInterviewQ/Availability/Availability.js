import React, { useState, useEffect } from 'react';
import SmallCalendar from '../../../../global/components/Calendar/SmallCalendar';
import { timeObjs } from '../../../../global/components/Dashboard/Schedule/TimeArrays';
import './Availability.scss';
import { GET_AVAILABILITIES, CREATE_AVAILABILITY, DELETE_AVAILABILITY } from './Resolvers';

import { useQuery, useMutation } from '@apollo/react-hooks';
import { format, getMonth } from 'date-fns';

const Availability =() => {

  const [setter, setSetter] = useState(true);
  const [selectedCell, setSelectedCell] = useState(new Date());
  const [dateAvails, setDateAvails] = useState();
  const [currentMonth, setCurrentMonth] = useState();
  const [currentDate, setCurrentDate] = useState();
  const [availability, setAvailability] = useState({
      recurring: false,
    });

  const [newAvail] = useMutation(CREATE_AVAILABILITY);
  const [removeAvail] = useMutation(DELETE_AVAILABILITY);
  const { data: availabilities, refetch } = useQuery(GET_AVAILABILITIES, {variables: {coach_id: localStorage.getItem('id')}});
   console.log(availabilities);

  useEffect(() => {
    setCurrentMonth(getMonth(new Date(selectedCell)) + 1)
    setCurrentDate(Number(format(selectedCell, 'd')));
    setSetter(!setter)
   // eslint-disable-next-line
  }, [selectedCell]);

  useEffect(() => {
    setAvailability({
      ...availability,
      year: Number(format(selectedCell, 'yyyy')),
      month: (Number(format(selectedCell, 'M'))),
      day: Number(format(selectedCell, 'd')),
    })
    // eslint-disable-next-line
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
    setAvailability({
     ...availability,
      start_hour: hour,
      start_minute: minute,
    })
    
    let newObj= {...availability,
      start_hour: hour,
      start_minute: minute,
    };
    console.log(newObj)
    console.log(dateAvails)
    newAvail({ variables: newObj })
      .then(res => {
        refetch();
        // setDateAvails([...dateAvails, availability])
        console.log('successful post')
      })
      .catch(err => console.log(err))
  }

  const deleteAvail = (h, m) => {
    let checkvar = {
      uniquecheck: `${localStorage.getItem('id')}-${format(selectedCell, 'yyyy')}-${currentMonth}-${currentDate}-${h}-${m}`
    };
    removeAvail({ variables: checkvar })
    .then(res => {
      refetch();
      console.log('deleted', checkvar)
    })
    .catch(err => console.log(err))
  }

  const toggleAvail = (e, h, m) => {
    if(e.target.className === 'available-slot interview-slot'){
      deleteAvail(h, m)
      e.target.className = 'unavailable-slot interview-slot';
      return
    }
    createAvail(h, m)
    e.target.className = 'available-slot interview-slot';     
  };

  useEffect(() => {
    availabilities ? setDateAvails(availabilities.availabilitiesByCoach.filter(avail => avail.day === currentDate && avail.month === currentMonth)) : setDateAvails([]);
    // console.log('maybe a thing', dateAvails, currentDate, currentMonth)
    // eslint-disable-next-line
  }, [setter || availabilities])

  console.log(dateAvails);

  return(
    <>
    
    <div className=' availability-container'>
   
    <div className='coach-availability'>
      <SmallCalendar selectedCell={selectedCell} setSelectedCell={setSelectedCell} />
      <div className='interview-slot-list'>
        {timeObjs.map(time => {
          // console.log('map running')
          return(
            <div key={time.display}  className={`${timeFilter(time.hour, time.minute) ? 'available-slot' : 'unavailable-slot'} interview-slot`} onClick={e => toggleAvail(e, time.hour, time.minute)}>
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

export default Availability;