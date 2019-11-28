// import React, { useState, useEffect } from 'react';

// import TimeColumn from './TimeColumn';

// import './DatePicker.scss';
// const DatePicker = () => {
//   let [year, setYear] = useState(2019);
//   let [month, setMonth] = useState(10);
//   let [weekView, setView] = useState(true);
//   let [date, setDate] = useState(new Date());
//   let [week, setWeek] = useState(date);
//   let [weekDates, setDates] = useState([]);


//   useEffect(() => {
//     week.setDate(date.getDate() - date.getDay())
//     setWeek(week => week);
//   }, [])

//   useEffect(() => {
//     let newWeek = [];
//     for (let i = 0; i < 7; i++) {
//       let date = new Date(week.getFullYear(), week.getMonth(), (week.getDate() + i), 9);
//       newWeek.push(date)
//     }
//     setDates(newWeek)
//   }, [week])

//   const handleDateChange = e => {
//     let newStart = new Date(week);
//     if (e.target.value) {
//       newStart.setDate(newStart.getDate() + 7)
//       setWeek(newStart);
//     } else {
//       newStart.setDate(newStart.getDate() - 7)
//       setWeek(newStart);
//     }
//   }
  
//   const handleView = () => {
//     setView(weekView => !weekView)
//   };



//   return (
//     <div className="date-picker">
//       <button onClick={handleView} disabled={weekView} className={weekView ? "selected" : ""}>Week</button>
//       <button onClick={handleView} disabled={!weekView} className={(!weekView ? "selected" : "") }>Month</button>
//       <div>
//         <button onClick={handleDateChange} value="">-</button>
//         <button onClick={handleDateChange} value={true}>+</button>
//         Date Picker
//         <div className="time-columns">
//         {weekDates.map(date => 
//           <TimeColumn date={date} />
//         )}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default DatePicker;