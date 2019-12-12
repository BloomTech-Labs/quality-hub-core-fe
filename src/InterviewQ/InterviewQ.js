import React from 'react';
import InterviewLandingPage from '../InterviewQ/components/Landing Page/index';
import DashInterviewQ from './components/DashInterviewQ/index';
import CoachForm from './components/CoachForm/CoachForm';
import CoachList from './components/CoachList';
import LeftNav from './components/LeftNav/LeftNav';
import { Route } from 'react-router-dom';
import Booking from './components/RequestInterview/index';
import TestComponent from './components/Review/subs/TestComponent';
import { ReviewPage } from './components/Review';
import ConfirmedInterview from './components/RequestInterview/subs/02_ConfirmedInterview';
import History from './components/History';
import CoachReport from './components/CoachReport';

const InterviewQContainer = () => {
	return (
		<>
			<LeftNav />
			<div>
				<Route exact path='/interviewq' component={InterviewLandingPage} />
				<Route path='/interviewq/addcoach' component={CoachForm} />
				<Route path='/interviewq/coachlist' component={CoachList} />
				<Route path='/interviewq/booking' component={Booking} />
				<Route path='/interviewq/settings' component={DashInterviewQ} />
				<Route
					path='/interviewq/interviewconfirmed'
					component={ConfirmedInterview}
				/>
				<Route path='/interviewq/history' component={History} />
				<Route path='/interviewq/coachreport/:key' component={CoachReport} />
				<Route exact path='/interviewq/test' component={TestComponent} />
				<Route exact path='/interviewq/test/:id' component={ReviewPage} />
			</div>
		</>
	);
};

export default InterviewQContainer;
