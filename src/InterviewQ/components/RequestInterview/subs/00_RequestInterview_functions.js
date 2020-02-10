// import { formatDistanceStrict, isBefore, format } from 'date-fns';

// function availableSlots(dateAvails, setCurrentSlots) {
// 	return () => {
// 		let bookingArray = [];
// 		for (let x = 0; x < dateAvails.length; x++) {
// 			for (let y = 0; y < dateAvails.length; y++) {
// 				let date1 = new Date(dateAvails[x].year, dateAvails[x].month - 1, dateAvails[x].day, dateAvails[x].hour, dateAvails[x].minute, 0);
// 				let date2 = new Date(dateAvails[y].year, dateAvails[y].month - 1, dateAvails[y].day, dateAvails[y].hour, dateAvails[y].minute, 0);
// 				let distanceInMinutes = formatDistanceStrict(date1, date2, {
// 					unit: 'minute',
// 				});
// 				if (distanceInMinutes == '30 minutes') {
// 					if (isBefore(date1, date2)) {
// 						bookingArray.push(dateAvails[x]);
// 						break;
// 					}
// 				}
// 			}
// 		}
// 		setCurrentSlots(bookingArray);
// 	};
// }

// function createBooking(setPrevId, prevId, props, availabilities, coachId) {
// 	return (e, slot) => {
// 		setPrevId(e.target.id);
// 		let prevSlot = document.getElementById(prevId);
// 		if (prevId && prevSlot !== null) {
// 			prevSlot.className = 'interview-slot';
// 		}
// 		if (e.target.id === slot.id) {
// 			e.target.className = 'available-slot interview-slot';
// 		}
// 		props.setBooking({
// 			...props.booking,
// 			hour: slot.hour,
// 			minute: slot.minute,
// 			coachName: `${availabilities.availabilitiesByCoach[0].coach.first_name} ${availabilities.availabilitiesByCoach[0].coach.last_name}`,
// 			price: availabilities.availabilitiesByCoach[0].coach.post.price,
// 			coach: coachId,
// 			year: Number(format(props.selectedCell, 'yyyy')),
// 			month: Number(format(props.selectedCell, 'M')),
// 			day: Number(format(props.selectedCell, 'd')),
// 			availId: slot.id,
// 		});
// 	};
// }

// export default { availableSlots, createBooking };

