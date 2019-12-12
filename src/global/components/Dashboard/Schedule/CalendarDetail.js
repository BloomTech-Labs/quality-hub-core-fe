import React, { useEffect, useState, useRef } from 'react';
import { ALL_BOOKINGS } from './Queries';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { format } from 'date-fns';
import { clock } from '../../../icons/Clock.js';
import { document } from '../../../icons/document.js';
import { paperclip } from '../../../icons/paperclip.js';
import { ICONS } from '../../../icons/iconConstants';
import Icon from '../../../icons/Icon';
import { utcToZonedTime } from 'date-fns-tz';
import Loading from '../../../../Core/components/Loading';
import { gql } from 'apollo-boost';

const CalendarDetail = ({ selectedDate, setOpen }) => {
	const DELETE_BOOKING = gql`
		mutation deleteBooking($uniquecheck: String!) {
			deleteBooking(uniquecheck: $uniquecheck) {
				id
			}
		}
	`;

	const { data, refetch, loading, client } = useQuery(ALL_BOOKINGS, {
		variables: {
			seekerId: localStorage.getItem('id'),
			coachId: localStorage.getItem('id'),
		},
	});

	const [booking, setBooking] = useState([]);
	const [allBookings, setAllBookings] = useState();
	const [selectedDay, setSelectedDay] = useState(format(selectedDate, 'd'));
	const [selectedMonth, setSelectedMonth] = useState(format(selectedDate, 'M'));
	const [deleteBook, { client: bookClient }] = useMutation(DELETE_BOOKING);

	const node = useRef();
	const sortBookingsFunction = array => {
		array.sort((a, b) => {
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
		return array;
	};
	useEffect(() => {
		refetch();
		if (data) {
			// console.log(client)
			// console.log(data.bookingsByCoach);
			let bookingArray = sortBookingsFunction([
				...data.bookingsByCoach,
				...data.bookingsBySeeker,
			]);

			setAllBookings(bookingArray);
		}
	}, [data]);

	useEffect(() => {
		if (allBookings) {
			let convertedBookings = allBookings.map(booking =>
				convertToLocal(booking),
			);
			setBooking(
				convertedBookings.filter(month => {
					// console.log(month);
					return (
						month.day === Number(selectedDay) &&
						month.month === Number(selectedMonth)
					);
				}),
			);
		}
	}, [allBookings]);

	//Krishan commented this line out
	// const allBookings = data.bookingsByCoach.concat(data.bookingsBySeeker);

	const localTime = Intl.DateTimeFormat().resolvedOptions().timeZone;

	// const selectedMonth = format(selectedDate, 'M');
	//   const selectedDay = format(selectedDate, 'd');

	//Krishan Commented this line out
	// const booking = data && allBookings.filter(month => {return month.day === Number(selectedDay)});

	// const coachBooking = data && booking.filter(booking => booking.coach.id === localStorage.getItem('id'));
	// const seekerBooking = data && booking.filter(booking => booking.seeker.id === localStorage.getItem('id'));
	const convertToLocal = obj => {
		let localAvailDay = obj.day <= 9 ? `0${obj.day}` : `${obj.day}`;
		let localAvailHour = obj.hour < 9 ? `0${obj.hour}` : `${obj.hour}`;
		let localAvailMin = obj.minute === 0 ? '00' : '30';
		let localAvail;
		if (obj.month < 10) {
			localAvail = `${obj.year}-0${obj.month}-${localAvailDay}T${localAvailHour}:${localAvailMin}:00.000Z`;
		} else {
			localAvail = `${obj.year}-${obj.month}-${localAvailDay}T${localAvailHour}:${localAvailMin}:00.000Z`;
		}
		let zoned = utcToZonedTime(localAvail, localTime);
		let zonedArr = format(zoned, 'yyyy M d H mm').split(' ');

		let zonedDate = {
			...obj,
			year: Number(zonedArr[0]),
			month: Number(zonedArr[1]),
			day: Number(zonedArr[2]),
			hour: Number(zonedArr[3]),
			minute: Number(zonedArr[4]),
		};

		return zonedDate;
	};
	const handleDelete = e => {
		let uniquecheck = e.target.getAttribute('data-id');
		// -${e.target.getAttribute('data-year')}-${e.target.getAttribute('data-month')}-${e.target.getAttribute('data-day')}-${e.target.getAttribute('data-hour')}-${e.target.getAttribute('data-minute')}`;
		console.log(uniquecheck);
		deleteBook({ variables: { uniquecheck: uniquecheck } })
			.then(res => {
				// client.clearStore();
				//window.location.reload(true);
				bookClient.clearStore();
				// refetch();
				setOpen(false);
				console.log(res);
			})
			.catch(err => {
				console.log(err.message);
			});
	};
	return (
		<div>
			<span className='cal-detail-header' onClick={() => setOpen(false)}>
				<Icon icon={ICONS.CLOSE} width={24} height={24} color='silver' />
			</span>
			{booking[0] ? (
				<div>
					{booking.map((info, index) => {
						console.log(info);
						return info.coach.id === localStorage.getItem('id') ? (
							<div className='coach-detail' key={index}>
								<h3>
									<span>&#x25FC;</span> InterviewQ
								</h3>
								<p>
									<Icon
										icon={ICONS.PERSONALINFO}
										width={15}
										height={15}
										color='#777'
									/>
									{info.seeker.first_name} {info.seeker.last_name} (Seeker)
								</p>
								<p>
									{clock()}{' '}
									{format(
										new Date(
											info.year,
											info.month - 1,
											info.day,
											info.hour,
											info.minute,
										),
										'PPPP - p ',
									)}
								</p>
								<p>
									{paperclip()}{' '}
									{info.resumeURL === null ? (
										<span>No resume provided</span>
									) : (
										<a
											target='_blank'
											rel='noopener noreferrer'
											href={info.resumeURL}>
											Download Resume
										</a>
									)}
								</p>
								<div>
									<p>
										{document()} What do you want to get out of your mock
										interview?
									</p>
									<p className='indented intres'>{info.interviewGoals}</p>
									<p className='indented'>
										What kind of questions do you want to focus on?
									</p>
									<p className='indented intres'>{info.interviewQuestions}</p>
								</div>
								{console.log('jargon', info)}
								{info.id && (
									<button
										className={`${info.id} delete-booking-btn`}
										data-id={`${info.uniquecheck}`}
										data-year={info.year}
										data-month={info.month}
										data-day={info.day}
										data-hour={info.hour}
										data-minute={info.minute}
										onClick={e => handleDelete(e)}>
										Cancel Booking
									</button>
								)}
							</div>
						) : (
							<div className='seeker-detail' key={index}>
								<h3>
									<span>&#x25FC;</span> InterviewQ
								</h3>
								<p>
									<Icon
										icon={ICONS.PERSONALINFO}
										width={15}
										height={15}
										color='#777'
									/>
									{info.coach.first_name} {info.coach.last_name} (Coach)
								</p>

								<p>
									{clock()}{' '}
									{format(
										new Date(
											info.year,
											info.month - 1,
											info.day,
											info.hour,
											info.minute,
										),
										'PPPP - p ',
									)}
								</p>
								{info.id && (
									<button
										className={`${info.id} delete-booking-btn`}
										data-id={`${info.uniquecheck}`}
										data-year={info.year}
										data-month={info.month}
										data-day={info.day}
										data-hour={info.hour}
										data-minute={info.minute}
										onClick={e => handleDelete(e)}>
										Cancel Booking
									</button>
								)}
							</div>
						);
					})}
				</div>
			) : (
				// console.log('its working???')
				<div className='coach-detail'>
					{/* {loading ? (
						<p>Please Wait. Loading...</p>
						
					) : ( */}

					<h3 className='no-bookings'>No bookings</h3>
					{/* // )} */}
				</div>
			)}
		</div>
	);
};

export default CalendarDetail;
