import React  from 'react';
import InterviewLandingPage from '../InterviewQ/components/Landing Page/index';
import DashInterviewQ from './components/DashInterviewQ/DashInterviewQ';
import CoachForm from './components/CoachForm/CoachForm';
import CoachList from './components/CoachList';
import QNav from './components/QNav';
import { Route } from 'react-router-dom';
import BookingContainer from './components/RequestInterview/BookingContainer';
import ConfirmedInterview from './components/RequestInterview/ConfirmedInterview';

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
        <Route path='/interviewq/interviewconfirmed' component={ConfirmedInterview} />
      </div>
		</>
	);
};

export default InterviewQContainer;