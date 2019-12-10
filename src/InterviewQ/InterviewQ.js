import React  from 'react';
import InterviewLandingPage from '../InterviewQ/components/Landing Page/index';
import DashInterviewQ from './components/DashInterviewQ/DashInterviewQ';
import CoachForm from './components/CoachForm/CoachForm';
import CoachList from './components/CoachList';
import QNav from './components/QNav';
import { Route } from 'react-router-dom';
import BookingContainer from './components/RequestInterview/BookingContainer';
<<<<<<< HEAD
import TestComponent from './components/Review/TestComponent';
import { ReviewForm } from './components/Review';
=======
import ConfirmedInterview from './components/RequestInterview/ConfirmedInterview';
>>>>>>> 629d989e869798bd7aa6554c7220852e34bfa904

const InterviewQContainer = () => {

	return (
		<>
			<QNav />
			<div>
				<Route exact path='/interviewq' component={InterviewLandingPage} />
				<Route path='/interviewq/addcoach' component={CoachForm} />
				<Route path='/interviewq/coachlist' component={CoachList} />
				<Route path='/interviewq/booking' component={BookingContainer} />
        <Route path='/interviewq/settings' component={DashInterviewQ} />
<<<<<<< HEAD
        <Route exact path='/interviewq/test' component={TestComponent} />
        <Route exact path='/interviewq/test/:id' component={ReviewForm} />
=======
        <Route path='/interviewq/interviewconfirmed' component={ConfirmedInterview} />
>>>>>>> 629d989e869798bd7aa6554c7220852e34bfa904
      </div>
		</>
	);
};

export default InterviewQContainer;