import React from 'react';


const TimeColumn = ({ date }) => {
  let arr = [];
  for (let i = 0; i < 10; i++) {
    let newDate = new Date(date);
    newDate.setHours(newDate.getHours() + i);
    arr.push(newDate);
  }
  return (
    <div className='time-column'>
      {date.toString().substring(0,15)}
      {
        arr.map(date => {
          let hour = date.getHours();
          let str;
          str = (hour <= 11 ? `${hour}:00 AM` : `${hour - 12}:00 PM`)
          str = (hour == 12 ? `${hour}:00 PM` : str);
          return <p className="time">{str}</p>
          }
        )
      }
    </div>
  )
}

export default TimeColumn;