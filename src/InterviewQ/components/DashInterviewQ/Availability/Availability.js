import React from 'react';
import SmallCalendar from '../../../../global/components/Calendar/SmallCalendar';
import { times } from '../../../../global/components/Dashboard/Schedule/TimeArrays';
import './Availability.scss';
import { gql } from 'apollo-boost'
import QNav from '../../QNav';
import { clock } from '../../../../globalIcons/Clock';

const Availability =() => {

  return(
    <>
    <QNav />
    <div className=' availability-container'>
   
     
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
    </div>
    </>
  )
};

export default Availability;