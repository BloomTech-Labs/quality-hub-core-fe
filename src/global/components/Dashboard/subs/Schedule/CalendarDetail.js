import React, { useEffect, useState } from 'react';
import { ALL_BOOKINGS } from './Queries';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { format, differenceInHours } from 'date-fns';
import { clock } from '../../../../../global/icons/Clock';
import { document } from '../../../../../global/icons/document.js';
import { paperclip } from '../../../../../global/icons/paperclip.js';
import { ICONS } from '../../../../../global/icons/iconConstants';
import Icon from '../../../../../global/icons/Icon';
import { convertToLocal } from '../../../../../global/utils/TZHelpers.js';
import Loading from '../../../Loading';
import { gql } from 'apollo-boost';

const CalendarDetail = ({ selectedDate, setOpen, node }) => {
	const DELETE_BOOKING = gql`
		mutation deleteBooking($uniquecheck: String!) {
			deleteBooking(uniquecheck: $uniquecheck) {
				id
			}
		}
	`;

	const { data, refetch } = useQuery(ALL_BOOKINGS, {
		variables: {
			seekerId: localStorage.getItem('id'),
			coachId: localStorage.getItem('id'),
		},
	});

	const [booking, setBooking] = useState([]);
	const [allBookings, setAllBookings] = useState();
	const [deleteBook, { client }] = useMutation(DELETE_BOOKING);

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
		if (data) {
			
			let bookingArray = sortBookingsFunction([
				...data.bookingsByCoach,
				...data.bookingsBySeeker,
			]);

			setAllBookings(bookingArray);
		}
	}, [data]);

	useEffect(() => {
		refetch();
		let selectedDay = format(selectedDate, 'd');
		let selectedMonth = format(selectedDate, 'M');
		if (allBookings) {
			//refetch();
			let convertedBookings = allBookings.map(booking =>
				convertToLocal(booking),
			);
			setBooking(
				convertedBookings.filter(month => {
					return (
						month.day === Number(selectedDay) &&
						month.month === Number(selectedMonth)
					);
				}),
			);
		}
	}, [allBookings]);

	const localTime = Intl.DateTimeFormat().resolvedOptions().timeZone;

	var canDelete = true

	const lessThan24 = (time) => {
		console.log(time)
		console.log(Date())
		console.log(differenceInHours(time, new Date()))
		if (differenceInHours(time, new Date()) < 24) {
			canDelete = false
			console.log(canDelete)
			return "disabled-delete-booking-btn"
		}
		else {
			return ""
		}
	}

	

	const handleDelete = (id, event) => {
		//let uniquecheck = e.target.getAttribute('data-id');
		// -${e.target.getAttribute('data-year')}-${e.target.getAttribute('data-month')}-${e.target.getAttribute('data-day')}-${e.target.getAttribute('data-hour')}-${e.target.getAttribute('data-minute')}`;
		//console.log(uniquecheck);
		event.stopPropagation();
		console.log()
		deleteBook({ variables: { uniquecheck: id } })
			.then(res => {
				// client.clearStore();
				window.location.reload(true);
				// client.clearStore();
				// refetch();
				setOpen(false);
				console.log(res);
			})
			.catch(err => {
				console.log(err.message);
			});
	};
	return (
		<div ref={node}>
			<span className='cal-detail-header' onClick={() => setOpen(false)}>
				<Icon icon={ICONS.CLOSE} width={24} height={24} color='silver' />
			</span>
			{booking[0] ? (
				<div>
					{booking.map((info, index) => {
						console.log(info);
						console.log(booking.length)
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
										onClick={(event) => handleDelete(info.uniquecheck, event)}>
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
										className={`${info.id} delete-booking-btn ${lessThan24(new Date(info.year, info.month - 1, info.day, info.hour, info.minute))}`}
										data-id={`${info.uniquecheck}`}
										data-year={info.year}
										data-month={info.month}
										data-day={info.day}
										data-hour={info.hour}
										data-minute={info.minute}
										onClick={(event) => canDelete ? handleDelete(info.uniquecheck, event) : event.preventDefault}>
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

					<h3 className='no-bookings'>No bookings</h3>
					{/* // )} */}
				</div>
			)}
		</div>
	);
};

export default CalendarDetail;
