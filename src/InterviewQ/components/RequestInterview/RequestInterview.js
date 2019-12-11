import React, { useState, useEffect, useCallback, useMemo } from 'react';
import SmallCalendar from '../../../global/components/Calendar/SmallCalendar';
import { Link } from 'react-router-dom';
import { format, getMonth } from 'date-fns';
import { useQuery } from '@apollo/react-hooks';
import { GET_AVAILABILITIES } from './Resolvers';
import { utcToZonedTime } from 'date-fns-tz';
import './RequestInterview.scss';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { uploadBox } from '../../../globalIcons/uploadBox';

const RequestInteview =(props) => {

const coachId = props.match.params.coachId
const { data: availabilities, refetch } = useQuery(GET_AVAILABILITIES, {variables: {coach_id: coachId}});

const localTime = Intl.DateTimeFormat().resolvedOptions().timeZone;

// const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
// const files = acceptedFiles.map(file => (
//   <li key={file.path}>
//     {file.path} - {file.size} bytes
//   </li>
// ));

const [resumeURL, setResumeURL] = useState(null);
const [resume, setResume] = useState(null);
const [currentSlots, setCurrentSlots] = useState();
const [setter, setSetter] = useState(true);
const [selectedCell, setSelectedCell] = useState(new Date());
const [dateAvails, setDateAvails] = useState();
const [currentMonth, setCurrentMonth] = useState();
const [currentDate, setCurrentDate] = useState();

const onDrop = useCallback(acceptedFiles => setResume(acceptedFiles), [])
const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

const convertToLocal = (obj) => {
  let localAvailDay = obj.day <= 9 ? `0${obj.day}` : `${obj.day}`
  let localAvailHour = obj.start_hour <= 9 ? `0${obj.start_hour}` : `${obj.start_hour}`
  let localAvailMin = obj.start_minute === 0 ? '00' : '30'
  let localAvail = `${obj.year}-${obj.month}-${localAvailDay}T${localAvailHour}:${localAvailMin}:00.000Z`;
  let zoned = utcToZonedTime(localAvail, localTime);
  let zonedArr = format(zoned, 'yyyy M d H mm').split(' ');
  let zonedDate = {
    ...obj,
    year: Number(zonedArr[0]),
    month: Number(zonedArr[1]),
    day: Number(zonedArr[2]),
    start_hour: Number(zonedArr[3]),
    start_minute: Number(zonedArr[4])
    
  }
  return zonedDate
}

const validateFile = checkFile =>{
  if (checkFile.type == "application/pdf") {
      return true;
  } else{
    return false;
  }
}

const dropbox = {
  width: '100%',
  height: '30px',
  background: 'black',
}

const dropboxDiv = {
  display: 'flex',
  justifyContent: 'flex-start',
  flexDirection: 'column',
  textAlign: 'left',
  margin: '20px 90px',
  border: '2px solid #DADCE0',
  borderRadius: '5px',
  height: '530px',
  margin: '8px 0',
  background: 'black'
}

const style = useMemo(() => ({
  ...dropboxDiv,
}), []);

useEffect(() => {
  if (resume) {

if(validateFile(resume)){

  console.log(validateFile(resume))
  let formData = new FormData();
  formData.append('file', resume);
  formData.append('upload_preset', process.env.REACT_APP_UPLOAD_PRESET);
  
  axios
  .post(
    `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
    formData,
    )
    .then(res => {
      console.log('successful post')
      setResumeURL(res.data.secure_url)
    })
    .catch(err => {
      console.log(err);
      });
    }
  }
  // eslint-disable-next-line
}, [resume]);



useEffect(() => {
  setCurrentMonth(getMonth(new Date(selectedCell)) + 1)
  setCurrentDate(Number(format(selectedCell, 'd')));
  setSetter(!setter)
  // eslint-disable-next-line
}, [selectedCell]);

const [prevId, setPrevId] = useState();

const handleChange = (e) => {
  props.setBooking({
    ...props.booking,
    [e.target.name]: e.target.value
  })
}
const createBooking = (e, slot) => {
  setPrevId(e.target.id)
  let prevSlot = document.getElementById(prevId)
  if (prevId && prevSlot !== null){
    console.log(prevId)
  
  prevSlot.className = 'interview-slot'
}
  e.target.className = 'available-slot interview-slot'
  

  props.setBooking({
    ...props.booking,
      hour: slot.start_hour,
      minute: slot.start_minute,
       coachName: `${availabilities.availabilitiesByCoach[0].coach.first_name} ${availabilities.availabilitiesByCoach[0].coach.last_name}`,
      // availabilityA: availA,
      // availabilityB: availB,
      // interviewGoals: e.value.interviewGoals,
      // interviewQuestions: e.target.value,
      coach: coachId,
      year: Number(format(selectedCell, 'yyyy')),
      month: (Number(format(selectedCell, 'M'))),
      day: Number(format(selectedCell, 'd')),
  })
  console.log(props.booking)
}

useEffect(()=> {
  refetch()
// eslint-disable-next-line
}, []
)
 
useEffect(() => {
  availabilities ? setDateAvails(availabilities.availabilitiesByCoach.map(avail => convertToLocal(avail)).filter(avail => avail.day === currentDate && avail.month === currentMonth && avail.isOpen === true)) : setDateAvails([])
  // eslint-disable-next-line
}, [setter || availabilities])

useEffect(()=>{
  if(dateAvails){getAvailableSlots()}
  // eslint-disable-next-line
},[dateAvails])

//this will hold all potential 1 hour blocks
let bookingArray = [];
const getAvailableSlots = () => {
  for(let x = 0; x < dateAvails.length-1; x++){
      for (let y = x+1; y < dateAvails.length; y++) {
          if (Math.abs(dateAvails[x].start_hour - dateAvails[y].start_hour) === 0) { //if it's the same hour
              if (dateAvails[x].start_minute < dateAvails[y].start_minute) {
                  bookingArray.push(dateAvails[x]); //if the first date is lower, push that, because it has a full hour availabile
              } else {
              bookingArray.push(dateAvails[y]); //if the second date is lower, push that, because it has a full hour available
              }   

          } else if (Math.abs(dateAvails[x].start_hour - dateAvails[y].start_hour) === 1) { //if the difference between the two is 1, then they are next to each other
            if (dateAvails[x].start_hour < dateAvails[y].start_hour) { //if the first date is lower...

                  if (dateAvails[y].start_minute - dateAvails[x].start_minute === -30) { //if the difference is -30, then the numbers are next to each other
                    bookingArray.push(dateAvails[x]); //push the first date to the bookingArray, because it is lower and has an hour block available
                  } else{ //if the difference is anything but -30, then they are more than an hour apart
                  }
              } else{ //if the second date is lower....
                  if(dateAvails[x].start_minute - dateAvails[y].start_minute === -30){ //if the difference is -30, then you know the numbers are next to each other 
                    bookingArray.push(dateAvails[y]) //push second date, because it is lower and has the hour block
                  } else{ //if the difference is NOT -30, then the blocks are not next to each other, and skip
                  }
              }
          } else { //the hours are not equal or next to each other, so we skip to the next date object
          }
      }
  }
  // let localTimeArray = bookingArray.map(booking => convertToLocal(booking))
setCurrentSlots(bookingArray);
}
// console.log(dateAvails)
// console.log(currentSlots)
if(currentSlots){
  // let test = [...currentSlots];
 currentSlots.sort((a,b)=>{
  
  if(a.start_hour > b.start_hour){
    return 1;
  } else if(b.start_hour  > a.start_hour){
    return -1;
  } 
  else if(a.start_minute > b.start_minute){
    return 1;
  } else{
    return -1;
  }

  });
  // console.log(test);
}
console.log(currentSlots)
return (
	<div className='booking-content-section'>
    
		<div className='formsection'>
    <div className='interviewq-header-container'>
      <h2>Select a Date</h2>
      </div>
      <div className='interviewq-content-container'>
			<div className='coach-availability'>
				<SmallCalendar
        availabilities={availabilities}
					selectedCell={selectedCell}
					setSelectedCell={setSelectedCell}
				/>
				<div className='interview-slot-list'>
					{currentSlots && currentSlots !== [] ? (
						currentSlots.map(time => {
							if (time.isOpen === true) {
								return (
									<div
                    key={time.id}
                    id={time.id}
										className='interview-slot'
										onClick={e => createBooking(e, time)}>
										{time.start_hour === 0 ? 12 : (time.start_hour > 12
											? time.start_hour - 12
											: time.start_hour)}
										:{time.start_minute === 0 ? '00' : '30'}{' '}
										{time.start_hour >= 12 ? 'PM' : 'AM'}
									</div>
								);
							}
							return null;
						})
					) : (
						<p>No availabile bookings today</p>
					)}
				</div>
			</div>

			{/* {props.booking && props.booking.minute !== undefined ? (
				<p>You've selected {format(new Date(props.booking.year, props.booking.month - 1, props.booking.day, props.booking.hour, props.booking.minute), "PPPP - p ")}</p>
			) : (
				<p> Please select a time slot</p>
			)} */}
		</div>
    </div>
    <div className="formsection">
    <div className='interviewq-header-container'>
      <h2>Additional Information</h2>
      </div>
      <div className='interviewq-content-container'>
        <div className='interviewq-booking-input'>
          <h3>Resume Upload</h3>
            {/* <section className="container"> */}
              {/* <div {...getRootProps({style})}>
                <input {...getInputProps({dropbox})} />
                {
                  isDragActive ?
                    <p>Drop the files here ...</p> :
                    <p>Drag 'n' drop some files here, or click to select files</p>
                }
                <h1>{`${isDragActive}`}</h1> 
              </div>  */}

            {/* <div {...getRootProps({className: 'dropzone'})}>
              <input {...getInputProps()} />
              <span>{uploadBox()}</span>
              <p>Click or drag file to this area to upload resume</p>
            </div> */}
            {/* <aside>
              <h4>Files</h4>
              <ul>{files}</ul>
            </aside> */}
            {/* </section> */}
      <input
							className=''
							type='file'
              id='resumeInput'
              accept="application/pdf"
							onChange={e => setResume(e.target.files[0])}
						/>
        </div>  
        <div className='interviewq-booking-input'>
      <h3>What do you want to get out of mock interviews?</h3>
      <textarea placeholder='e.g. More confidence, preparation for upcoming interview etc....' name='interviewGoals' value={props.booking.interviewGoals} onChange={handleChange} />
</div>
<div className='interviewq-booking-input'>
      <h3>What kind of interview questions do you want to focus on?</h3>
      <textarea 
      placeholder='e.g. Technical questions, soft skill questions etc' name='interviewQuestions' value={props.booking.interviewQuestions} onChange={handleChange}/>
    </div>
    </div>
    </div>
    <div className='formsection'>
    <div className='interviewq-header-container'>
   
      <h2>Payment Info</h2>
      <div className='interviewq-content-container'>
      </div>
      </div>
    </div>
    <div className='formsection'>
    {props.booking && props.booking.minute !== undefined ? (
				<Link to={`/interviewq/booking/${coachId}/confirm`}>
					<button className='interview-button'>Next</button>
				</Link>
			) : (
				<p> Please select a time slot</p>
			)}
      </div>
	</div>
);
};

export default RequestInteview;