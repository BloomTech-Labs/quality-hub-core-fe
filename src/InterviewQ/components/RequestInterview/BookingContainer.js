import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import RequestInteview from './RequestInterview';
import ConfirmInterview from './ConfirmInterview';

const BookingContainer = () => {
	const [booking, setBooking] = useState({});
	return (
		<>
			<Route
				path='/interviewq/booking/:coachId/confirm'
				render={props => <ConfirmInterview {...props} booking={booking} />}
			/>
			<Route
				exact
				path='/interviewq/booking/:coachId'
				render={props => (
					<RequestInteview
						{...props}
						booking={booking}
						setBooking={setBooking}
					/>
				)}
			/>
		</>
	);
};

export default BookingContainer;