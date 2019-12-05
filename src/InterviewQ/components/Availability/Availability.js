import React from 'react';
import SmallCalendar from '../../../global/components/Calendar/SmallCalendar';
import { times } from '../../../global/components/Dashboard/Schedule/TimeArrays';
import './Availability.scss';

const Availability =() => {

  return(
    <div className='coach-availability'>
      <SmallCalendar />
      <div className='interview-slot-list'>
        {times.map(time => {
          return(
            <div className='interview-slot'>
              <p>{time}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
};

export default Availability;