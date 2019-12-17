import React, { useState, useEffect } from 'react';
import SmallCalendar from '../../../../../global/components/Calendar/SmallCalendar';
import { timeObjs } from '../../../../../global/utils/TimeArrays';
import './00_Availability.scss';
import { GET_AVAILABILITIES, CREATE_AVAILABILITY, DELETE_AVAILABILITY } from './Resolvers';

import { useQuery, useMutation } from '@apollo/react-hooks';
import { format, getMonth, getYear } from 'date-fns';
import { convertToLocal, convertToUTC } from '../../../../../global/utils/TZHelpers';

const Availability =() => {

  const [open, setOpen] = useState(true);
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
  
  const localTime = Intl.DateTimeFormat().resolvedOptions().timeZone;
  
  useEffect(() => {
    console.log(selectedCell);
    setCurrentMonth(getMonth(new Date(selectedCell)) + 1)
    setCurrentDate(Number(format(selectedCell, 'd')));
    setSetter(!setter)
    setAvailability({
      ...availability,
      year: Number(format(selectedCell, 'yyyy')),
      month: (Number(format(selectedCell, 'M'))),
      day: Number(format(selectedCell, 'd')),
    })
    refetch()
   // eslint-disable-next-line
  }, [selectedCell]);




  const timeFilter = (h, m) => {
    let returnvar = false;
    (availabilities && dateAvails) &&
      dateAvails.forEach(({ hour, minute }) => {
        if (h === hour && minute === m) {
          returnvar = true;
        }
      });
    return returnvar;
  };

  const createAvail = (hour, minute) => {
    
    let newObj= {...availability,
      hour: hour,
      minute: minute,
    };
    
    const utcAvail = convertToUTC(newObj);
    
    let utcObj = {
      ...availability,
      ...utcAvail
    }
    
    newAvail({ variables: utcObj })
      .then(res => {
        refetch();     
      })
      .catch(err => console.log(err))
  }
useEffect(()=>{
  console.log(currentMonth)
  refetch();
},[currentMonth])
  const checkAvail = (checkvar) => {
    if(dateAvails){
      dateAvails.forEach(avail => {
        if(avail.uniquecheck === checkvar.uniquecheck){
          return avail.isOpen === true ? true : false
      } else {
        return true
      }
    })
    }
    return true
  }
  const deleteAvail = (h, m) => {
    const delAvail ={
      hour: h,
      minute: m,
      year: format(selectedCell, 'yyyy'),
      month: currentMonth,
      day: currentDate
    }
    const delUtc = convertToUTC(delAvail)
    
    let checkvar = {
      uniquecheck: `${localStorage.getItem('id')}-${delUtc.year}-${delUtc.month}-${delUtc.day}-${delUtc.hour}-${delUtc.minute}`
    };
    if (checkAvail(checkvar) === true){
    removeAvail({ variables: checkvar })
    .then(res => {
      refetch();
      console.log('deleted', checkvar)
    })
    .catch(err => console.log(err))
  }
  else {
    console.log('cannot delete')
  }
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
    availabilities ? setDateAvails(availabilities.availabilitiesByCoach.map(avail => convertToLocal(avail)).filter(avail => avail.day === currentDate && avail.month === currentMonth && avail.year === getYear(selectedCell))) : setDateAvails([]);
    // eslint-disable-next-line
  }, [setter || availabilities, selectedCell])

  return(
    <>
    
    <div className='availability-container'>
   
    <div className='coach-availability'>
      <SmallCalendar selectedCell={selectedCell} setSelectedCell={setSelectedCell} availabilities={availabilities} refetchAvails={refetch} open={open} setOpen={setOpen} />
      <div className='interview-slot-list'>
        {open && timeObjs.map(time => {
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