import React from 'react';
import SmallCalendar from '../../../global/components/Calendar/SmallCalendar';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const RequestInteview =() => {

const GET_AVAILABILITIES = gql `
  query{
    availabilities{
      id
      year
      month
      day
      start_hour
      start_minute
      isOpen
      coach{
        id
      }
    }
    }
`

const { data: availabilities } = useQuery(GET_AVAILABILITIES);
console.log(availabilities);

  return(
    <div className='request-interview'>
      <SmallCalendar />
      <div className='interview-slot-list'>
        {/* Should map availabilities that exist for coach that is being viewed */}
      {/* {availabilities.map(time => {
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