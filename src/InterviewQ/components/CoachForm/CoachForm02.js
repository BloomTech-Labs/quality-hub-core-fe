import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './CoachForm.scss';
import './CoachForm02.scss'
// import Slider from 'react-rangeslider';
// import 'react-rangeslider/lib/index.css';


// }

function CoachFormTwo ({ history, progress, setProgress, formState, setFormState }) {

  const [value, setValue] = useState(0)
  
  const handleChangeStart = () => {
    console.log('Change event started')
  };

  const handleChange = e => {
    setValue(e.target.value)
  };

  const handleChangeComplete = () => {
    console.log('Change event completed')
  };

  function submitHandler () {
    setProgress(3)
    history.push("/addcoach/04")
    setFormState({...formState, price: value})
  }

  function backHandler () {
    setProgress(1)
    history.push("/addcoach")
  }


  return (
    <div className='slider'>
      <h2>Hourly Rate</h2>
      <p>Please set your hourly rate. To get the most jobs, we recommend setting your rate between $20 and $50.</p>
      <div className='value'>${value}</div>
      <div className="slider-container">
        <label>
          <input
          type="range"
          min="10"
          max="100"
          value={value}
          onChange={handleChange}
          step="1"
          />
        </label>
        {/* <Slider
          min={0}
          max={200}
          value={value}
          onChangeStart={handleChangeStart}
          onChange={handleChange}
          onChangeComplete={handleChangeComplete}
        /> */}
      </div>
      {/* <div className='value'>{value}</div> */}
      <div className="HourlyRate-buttons">
        <button onClick={backHandler} >Back</button>
        <br/>
        <button onClick={submitHandler} >Save and next</button>
      </div>
    </div>
  )
}
  
export default CoachFormTwo;