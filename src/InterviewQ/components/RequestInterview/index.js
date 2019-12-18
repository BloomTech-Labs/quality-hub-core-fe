import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import RequestInteview from './subs/00_RequestInterview';
import ConfirmInterview from './subs/01_ConfirmInterview';

const BookingContainer = () => {
	const [booking, setBooking] = useState({});
	const [selectedCell, setSelectedCell] = useState(new Date());
	return (
		<>
			<Route
				path='/interviewq/booking/:coachId/confirm'
				render={props => <ConfirmInterview {...props} booking={booking} selectedCell={selectedCell}/>}
			/>
			<Route
				exact
				path='/interviewq/booking/:coachId'
				render={props => (
					<RequestInteview
						{...props}
						setSelectedCell={setSelectedCell}
						selectedCell={selectedCell}
						booking={booking}
						setBooking={setBooking}
					/>
				)}
			/>
		</>
	);
};

export default BookingContainer;