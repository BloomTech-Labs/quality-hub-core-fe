import React from 'react';
import SmallCalendar from '../../../global/components/Calendar/SmallCalendar';
import { times } from '../../../global/components/Dashboard/Schedule/TimeArrays';
import './Availability.scss';
import { gql } from 'apollo-boost'
import QNav from '../QNav';
import { clock } from '../../../globalIcons/Clock';

const Availability =() => {

  return(
    <>
    <QNav />
    <div className='lower-dashboard availability-container'>
    <div className='coachinfo-header'>
				<div className='circle-blue'>
					{clock()}
				</div>
				<h1>Availability</h1>
    
			</div>
      <div className='sub-header'>
      <h2>Select a Date and Time</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque nunc nunc amet, nunc urna ac vitae. Tempus mi sit amet lacus congue.</p>
      </div>
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