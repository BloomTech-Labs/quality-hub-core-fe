import React  from 'react';
import InterviewLandingPage from '../InterviewQ/components/Landing Page/index';
import DashInterviewQ from './components/DashInterviewQ/DashInterviewQ';
import CoachForm from './components/CoachForm/CoachForm';
import CoachList from './components/CoachList';
import QNav from './components/QNav';
import { Route, Switch } from 'react-router-dom';
import Availability from '../InterviewQ/components/DashInterviewQ/Availability/Availability';
import ConfirmInterview from './components/RequestInterview/ConfirmInterview';
import RequestInterview from './components/RequestInterview/RequestInterview';
import BookingContainer from './components/RequestInterview/BookingContainer';

const InterviewQContainer = () => {

	return (
		<>
				<QNav />
			<div>
				<Route exact path='/interviewq' component={InterviewLandingPage} />
				{/* <Route path='/hey' component={DatePicker} /> */}
				<Route path='/interviewq/addcoach' component={CoachForm} />
				{/* <PrivateRoute path='/addcoach' component={CoachForm00} /> */}
				<Route path='/interviewq/coachlist' component={CoachList} />
				 <Route path='/interviewq/booking' component={BookingContainer} />
					{/*<Route path='/interviewq/availability' component={Availability} /> */}
        <Route path='/interviewq/settings' component={DashInterviewQ} />
      {/* <Route path='/interviewq/booking/:id/confirm' component={ConfirmInterview} />	
        <Route path='/interviewq/booking/:coach_id' component={RequestInterview} /> */}
      </div>
		</>
	);
};

export default InterviewQContainer;