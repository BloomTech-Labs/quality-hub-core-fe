import React, { useState, useEffect } from 'react';
import SmallCalendar from '../../../../global/components/Calendar/SmallCalendar';
import { timeObjs } from '../../../../global/components/Dashboard/Schedule/TimeArrays';
import './Availability.scss';
import { GET_AVAILABILITIES, CREATE_AVAILABILITY, DELETE_AVAILABILITY, AVAIL_BY_UNIQUE } from './Resolvers';

import { useQuery, useMutation } from '@apollo/react-hooks';
import { format, getMonth } from 'date-fns';
import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz'
// import { zonedTimeToUtc } from 'date-fns-tz/esm';

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
  
  const localTime = Intl.DateTimeFormat().resolvedOptions().timeZone;
  
  //  console.log(localTime);
  useEffect(() => {
     console.log(availabilities);
    setCurrentMonth(getMonth(new Date(selectedCell)) + 1)
    setCurrentDate(Number(format(selectedCell, 'd')));
    setSetter(!setter)
    console.log('here');
    setAvailability({
      ...availability,
      year: Number(format(selectedCell, 'yyyy')),
      month: (Number(format(selectedCell, 'M'))),
      day: Number(format(selectedCell, 'd')),
    })
    refetch()
    console.log('end')
   // eslint-disable-next-line
  }, [selectedCell]);




  const timeFilter = (hour, min) => {
    console.log('time filter')
    let returnvar = false;
    (availabilities && dateAvails) &&
      dateAvails.forEach(({ start_hour, start_minute }) => {
        if (start_hour === hour && start_minute === min) {
          returnvar = true;
        }
      });
    return returnvar;
  };

  // `${obj.year}-${obj.month}-0${obj.day}T0${obj.start_hour}:${obj.start_minute}:00:000Z`
  
  const convertToUTC = (obj) => {
    console.log('convert to UTC');
    let localAvail = new Date(obj.year, obj.month - 1, obj.day, obj.start_hour, obj.start_minute)
    let utc = zonedTimeToUtc(localAvail, localTime);
    let utcArr = utc.toISOString().split(/[T:-]/g);
    let UTCdate = {
      ...obj,
      year: Number(utcArr[0]),
      month: Number(utcArr[1]),
      day: Number(utcArr[2]),
      start_hour: Number(utcArr[3]),
      start_minute: Number(utcArr[4])
    }
    return UTCdate
  }

  const convertToLocal = (obj) => {
    console.log('convert to Local')
    // let localAvailDay = '0' + obj.day
    let localAvailDay = obj.day <= 9 ? `0${obj.day}` : `${obj.day}`
    let localAvailHour = obj.start_hour <= 9 ? `0${obj.start_hour}` : `${obj.start_hour}`
    let localAvailMin = obj.start_minute === 0 ? '00' : '30'
    let localAvail;
    if(obj.month < 10){
      localAvail = `${obj.year}-0${obj.month}-${localAvailDay}T${localAvailHour}:${localAvailMin}:00.000Z`;
    } else{
      localAvail = `${obj.year}-${obj.month}-${localAvailDay}T${localAvailHour}:${localAvailMin}:00.000Z`;
    }
    let zoned = utcToZonedTime(localAvail, localTime);
    let zonedArr = format(zoned, 'yyyy M d H mm').split(' ');
    let zonedDate = {
      // id: obj.id,
      // isOpen: obj.isOpen,
      ...obj,
      year: Number(zonedArr[0]),
      month: Number(zonedArr[1]),
      day: Number(zonedArr[2]),
      start_hour: Number(zonedArr[3]),
      start_minute: Number(zonedArr[4])
      
    }
    console.log('end local')
    return zonedDate
  }

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
    // console.log(newObj)
    // console.log(dateAvails)
    // let localAvail = new Date(newObj.year, newObj.month - 1, newObj.day, newObj.start_hour, newObj.start_minute);
    // let utcAvail = utcToZonedTime(localAvail, localTime);
    // console.log(localAvail);
    // console.log(utcAvail.toISOString().split('-').join(', ').split('T'));
    // console.log(utcAvail.toISOString());
    console.log(newObj);
    const utcAvail = convertToUTC(newObj);
    // console.log(utcAvail);
    let utcObj = {
      ...availability,
      ...utcAvail
    }
    // console.log(utcObj);
    newAvail({ variables: utcObj })
      .then(res => {
        refetch();
        // setDateAvails([...dateAvails, availability])
        console.log('successful post', utcObj)
      })
      .catch(err => console.log(err))
  }

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
      start_hour: h,
      start_minute: m,
      year: format(selectedCell, 'yyyy'),
      month: currentMonth,
      day: currentDate
    }
    const delUtc = convertToUTC(delAvail)
    console.log(delUtc)
    let checkvar = {
      uniquecheck: `${localStorage.getItem('id')}-${delUtc.year}-${delUtc.month}-${delUtc.day}-${delUtc.start_hour}-${delUtc.start_minute}`
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
    // console.log('hello!')
    // let localAvails = availabilities ? availabilities.availabilitiesByCoach.map(avail => convertToLocal(avail)) : [];
    // let currentAvails = availabilities ? availabilities.availabilitiesByCoach.filter(avail => avail.day === currentDate && avail.month === currentMonth) : [];
    // availabilities ? setDateAvails(currentAvails.map(avail => convertToLocal(avail))) : setDateAvails([])
    availabilities ? setDateAvails(availabilities.availabilitiesByCoach.map(avail => convertToLocal(avail)).filter(avail => avail.day === currentDate && avail.month === currentMonth)) : setDateAvails([]);
    // availabilities ? setDateAvails(availabilities.availabilitiesByCoach.filter(avail => avail.day === currentDate && avail.month === currentMonth)) : setDateAvails([]);
    // console.log('maybe a thing', dateAvails, currentDate, currentMonth)
    // eslint-disable-next-line
  }, [setter || availabilities])

  // console.log(dateAvails);

  // console.log(convertToLocal({day: 9,
  //   id: "ck3upwah2043q0787lri6p636",
  //   isOpen: true,
  //   month: 12,
  //   recurring: false,
  //   start_hour: 6,
  //   start_minute: 30,
  //   uniquecheck: "ck34qxshk000e0796rsdew5t32019129130",
  //   year: 2019}))

  //   console.log(convertToUTC({day: 9,
  //     id: "ck3upwah2043q0787lri6p636",
  //     isOpen: true,
  //     month: 12,
  //     recurring: false,
  //     start_hour: 1,
  //     start_minute: 30,
  //     uniquecheck: "ck34qxshk000e0796rsdew5t32019129130",
  //     year: 2019}))
  // console.log(availabilities)
  return(
    <>
    
    <div className=' availability-container'>
   
    <div className='coach-availability'>
      <SmallCalendar selectedCell={selectedCell} setSelectedCell={setSelectedCell} availabilities={availabilities}/>
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