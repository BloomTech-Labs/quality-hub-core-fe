import React from 'react';
import SmallCalendar from '../../../global/components/Calendar/SmallCalendar';

const RequestInteview =() => {

  return(
    <div className='request-interview'>
      <SmallCalendar />
      <div className='interview-slot-list'>
        {/* Should map availabilities that exist for coach that is being viewed */}
      {/* {times.map(time => {
          return(
            <div className='interview-slot'>
              <p>{time}</p>
            </div>
          )
        })} */}
      </div>
    </div>
  )
};

export default RequestInteview;