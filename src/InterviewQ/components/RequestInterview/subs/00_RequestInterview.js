// import {  } from './test';
import React, { useState, useEffect, useCallback } from 'react';
import SmallCalendar from '../../../../global/components/Calendar/SmallCalendar';
import { Link } from 'react-router-dom';
import {
	format,
	getMonth,
	isBefore,
	getYear,
	formatDistanceStrict,
	differenceInMilliseconds
} from 'date-fns';
import { useQuery } from '@apollo/react-hooks';
import { GET_AVAILABILITIES } from './Resolvers';
import './00_RequestInterview.scss';
import axios from 'axios';
import { convertToLocal } from '../../../../global/utils/TZHelpers';
import Dropzone from 'react-dropzone';
import { DropzoneIcon } from '../../../../global/icons/dropzone';
import { checkcircle } from '../../../../global/icons/checkcircle';

//functions 
import {availableSlots, createBookingFunction } from './00_RequestInterview_functions.js';

const RequestInteview = props => {
	const coachId = props.match.params.coachId;
	const { data: availabilities, refetch } = useQuery(GET_AVAILABILITIES, {
		variables: { coach_id: coachId },
	});

	const [resumeURL, setResumeURL] = useState(null);
	const [resume, setResume] = useState(null);
	const [currentSlots, setCurrentSlots] = useState();
	const [setter, setSetter] = useState(true);
	const [dateAvails, setDateAvails] = useState();
	const [currentMonth, setCurrentMonth] = useState();
	const [currentDate, setCurrentDate] = useState();
	const [dragOver, setDragOver] = useState(false);
	const [dropped, setDropped] = useState(false);

	const validateFile = checkFile => {
		if (checkFile.type === 'application/pdf') {
			return true;
		} else {
			return false;
		}
	};

	useEffect(() => {
		if (resume) {
			if (validateFile(resume)) {
				let formData = new FormData();
				formData.append('file', resume);
				formData.append('upload_preset', process.env.REACT_APP_UPLOAD_PRESET);

				axios
					.post(
						`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
						formData,
					)
					.then(res => {
						setResumeURL(res.data.secure_url);
						setDropped(true);
					})
					.catch(err => {
						console.log(err);
					});
			}
		}
		
	}, [resume]);

	useEffect(() => {
		setCurrentMonth(getMonth(new Date(props.selectedCell)) + 1);
		setCurrentDate(Number(format(props.selectedCell, 'd')));
		setSetter(!setter);
		
	}, [props.selectedCell]);

	const [prevId, setPrevId] = useState();

	const handleChange = e => {
		props.setBooking({
			...props.booking,
			[e.target.name]: e.target.value,
		});
	};
	const createBooking = createBookingFunction (setPrevId, prevId, props, availabilities, coachId);

	useEffect(() => {
		if (resumeURL) {
			props.setBooking({
				...props.booking,
				resumeURL: resumeURL,
			});
		}
	}, [resumeURL]);

	useEffect(() => {
		const bookedSlot = document.getElementById(props.booking.availId);
		if (bookedSlot) {
			bookedSlot.classList.add('available-slot');
		}
	}, [currentSlots]);

	useEffect(() => {
		availabilities
			? setDateAvails(
					availabilities.availabilitiesByCoach
						.map(avail => convertToLocal(avail))
						.filter(
							avail =>
								avail.isOpen === true,
						),
			  )
			: setDateAvails([]);
		// eslint-disable-next-line
	}, [setter || availabilities]);

	useEffect(() => {
		if (dateAvails) {
			getAvailableSlots();
		}
	}, [dateAvails]);

	const getAvailableSlots = availableSlots (dateAvails, setCurrentSlots);

	if (currentSlots) {
		currentSlots.sort((a, b) => {
			if (a.hour > b.hour) {
				return 1;
			} else if (b.hour > a.hour) {
				return -1;
			} else if (a.minute > b.minute) {
				return 1;
			} else {
				return -1;
			}
		});
	}

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const dragFunction = () => {
		setDragOver(true);
	};

	const offDragFunction = () => {
		setDragOver(false);
	};

	return (
		<div className="booking-content-section">
			<div className="formsection">
				<div className="booking-header-container">
					<h2 className="booking-first-header">
						Select a Date - Coach{' '}
						{props.history.location.state &&
						props.history.location.state.coachName
							? props.history.location.state.coachName
							: props.history.location.state &&
							  props.history.location.state.bookingCoach
							? props.history.location.state.bookingCoach
							: ' '}
					</h2>
				</div>
				<div className="booking-subheading">
					<p>Please select a date and timeslot for your mock interview</p>
					<p id="booking-note">* A mock interview session is 30 minutes</p>
				</div>
				<div className="interviewq-content-container">
					<div className="coach-availability">
						<SmallCalendar
							availabilities={availabilities}
							selectedCell={props.selectedCell}
							setSelectedCell={props.setSelectedCell}
							refetchAvails={refetch}
						/>
						<div className='request-interview-slot-list'>
							{currentSlots ? (
								currentSlots.map(time => {
									if(time.day == currentDate && time.month == currentMonth && time.year == getYear(props.selectedCell)){

									
									if (time.isOpen === true) {
										const isPast = time =>
											differenceInMilliseconds(time, new Date()) < 0
												? 'disabled-interview-slot'
												: '';
										const inPast = e =>
											differenceInMilliseconds(
												new Date(
													time.year,
													time.month - 1,
													time.day,
													time.hour,
													time.minute,
												),
												new Date(),
											) < 0
												? console.log('true')
												: createBooking(e, time);

										return (
											<div
												key={time.id}
												id={time.id}
												className={`interview-slot ${isPast(
													new Date(
														time.year,
														time.month - 1,
														time.day,
														time.hour,
														time.minute,
													),
												)}`}
												onClick={inPast}>
												{/* inPast ? "" : createBooking(e, time) */}
												{time.hour === 0
													? 12
													: time.hour > 12
													? time.hour - 12
													: time.hour}
												:{time.minute === 0 ? '00' : '30'}{' '}
												{time.hour >= 12 ? 'PM' : 'AM'}
											</div>
										);
									}
								}
									return null;
								})
							) : (
								<p>No availabile bookings today</p>
							)}
						</div>
					</div>

				</div>
			</div>
			<div className="formsection">
				<div className="booking-header-container">
					<h2>Additional Information</h2>
				</div>
				<div className="booking-subheading">
					<p>
						Please respond to these prompts to give your interview coach a
						better sense of who you are and what your goals and motivations are.
					</p>
				</div>
				<div className="interviewq-content-container">
					<div className="interviewq-booking-input">
								<h3>Resume Upload</h3>
						<Dropzone
							onDrop={acceptedFiles => {
								setResume(acceptedFiles[0]);
								offDragFunction();
							}}>
							{({ getRootProps, getInputProps }) => (
								<section>
									<div {...getRootProps()}>
										<input {...getInputProps()} accept="application/pdf"/>
										<div
											className={`interviewq-create-booking-dropzone ${dragOver ? 'interviewq-dropped-file' : ''}`}
											onDragOver={() => dragFunction()}
											onMouseLeave={() => offDragFunction()}
											onDragLeave={() => offDragFunction()}
											>
												
												{dropped ? checkcircle() : DropzoneIcon()}
											<p className="interviewq-dropzone-text">
												{'Click or drag PDF file to this area to upload your resume'}
											</p>
											{dropped && `Attached file: ${resume.name}`}
										</div>
									</div>
								</section>
							)}
						</Dropzone>
					</div>
					<div className="interviewq-booking-input">
						<h3>What do you want to get out of mock interviews?</h3>
						<textarea
							placeholder="e.g. More confidence, preparation for upcoming interview etc...."
							name="interviewGoals"
							value={props.booking.interviewGoals}
							onChange={handleChange}
						/>
					</div>
					<div className="interviewq-booking-input">
						<h3>What kind of interview questions do you want to focus on?</h3>
						<textarea
							placeholder="e.g. Technical questions, soft skill questions etc"
							name="interviewQuestions"
							value={props.booking.interviewQuestions}
							onChange={handleChange}
						/>
					</div>
				</div>
			</div>

			{props.booking && props.booking.minute !== undefined ? (
				<div className="booking-button-container">
					<Link
						className="book-interview-button"
						to={{
							pathname: `/interviewq/booking/${coachId}/confirm`,
							state: {
								price: props.location.state.price
							}
							}}>

						<button>
							<p>Next</p>
						</button>
					</Link>
				</div>
			) : (
				<div className="booking-bottom">
					<p> Please select a time slot above to continue</p>
				</div>
			)}
		</div>
	);
};
export default RequestInteview;





