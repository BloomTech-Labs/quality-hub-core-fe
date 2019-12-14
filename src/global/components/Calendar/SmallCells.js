import React, {useState, useEffect} from 'react';
import {
	format,
	isSameMonth,
	isSameDay,
	toDate,
	endOfMonth,
	startOfWeek,
	endOfWeek,
	addDays,
	startOfMonth,
	getDate,
	getMonth,
	isBefore,
} from 'date-fns';
import { convertToLocal } from '../../../global/utils/TZHelpers';

const SmallCells = ({ onDateClick, currentMonth, selectedDate, availabilities, refetchAvails }) => {

	const [allTheAvails, setAllTheAvails] = useState();
	let integerMonth = getMonth(currentMonth) + 1;
	
	const monthStart = startOfMonth(currentMonth);
	const monthEnd = endOfMonth(monthStart);
	const startDate = startOfWeek(monthStart);
	
	const endDate = endOfWeek(monthEnd);
	const dateFormat = 'd';
	const rows = [];
	let days = [];
	let day = startDate;
	let formattedDate = '';
	let cellId = '';

		const getAvailableSlots = (dateAvails) => {
			let bookingArray = [];
			const convertMinute = oldMinute => {
				return oldMinute == 0 ? '00' : '50';
			};
			for (let x = 0; x < dateAvails.length; x++) {
				for (let y = 0; y < dateAvails.length; y++) {
					if (
						`${dateAvails[x].hour}${convertMinute(
							dateAvails[x].minute,
						)}` -
							`${dateAvails[y].hour}${convertMinute(
								dateAvails[y].minute,
							)}` ==
						-50
					) {
						bookingArray.push(dateAvails[x]);
						break;
					}
				}
			}
			setAllTheAvails(bookingArray);
		};

useEffect(() => {
	if (availabilities) {
		let someArray = availabilities.availabilitiesByCoach
			.map(avail => convertToLocal(avail))
			.filter(avail => avail.month === integerMonth && avail.isOpen === true);

		getAvailableSlots(someArray);
	}
}, [availabilities, currentMonth]);

	const availsExist = someDate => {
		let integerDate = getDate(someDate);
		let match = false;
		if (allTheAvails) {
			for (let i = 0; i < allTheAvails.length; i++) {
				if (
					allTheAvails[i].month === integerMonth &&
					allTheAvails[i].day === integerDate
				) {
					match = true;
					break;
				}
			}
			return match;
		}
	};

	while (day <= endDate) {
		for (let i = 0; i < 7; i++) {
			formattedDate = format(day, dateFormat);
			cellId = format(day, 'Md');
			const cloneDay = day;
			days.push(
				
				<div
					id={cellId}
					className={`small-col  ${isBefore(day, new Date()) ?
						'past-day'  :
						'small-cell'
					} ${getDate(day) === getDate(new Date()) ? 'today' : ' '}`} 
					key={day}
					onClick={() => onDateClick(toDate(cloneDay))}>
						
					<div className={`${
						!isSameMonth(day, monthStart)
							? 'disabled'
							: isSameDay(day, selectedDate)
							? 'small-selected'
							: availsExist(day) ? 'match-light-blue' : ''
					}`}><p>{formattedDate}</p></div>
					
				</div>,
			);
			day = addDays(day, 1);
		}
		rows.push(
			<div className='row' key={day}>
				{days}
			</div>,
		);
		days = [];
  }
	
	return( 
	<>
	<div className='calendar-body'>{rows}</div>
	</>
	);
};

export default SmallCells;