import React from 'react';
import InterviewLandingPage from '../InterviewQ/components/LandingPage';
import DashInterviewQ from './components/DashInterviewQ';
import CoachForm from './components/CoachForm/CoachForm';
import CoachList from './components/LandingPage/CoachList';
import LeftNav from './components/LeftNav/LeftNav';
import { Route } from 'react-router-dom';
import Booking from './components/RequestInterview';
import ReviewPage from './components/Review';
import ConfirmedInterview from './components/RequestInterview/subs/02_ConfirmedInterview';
import History from './components/History';
import CoachReport from './components/CoachReport';
import Meeting from './components/Meeting';

const InterviewQContainer = (props) => {
	console.log(props.location.pathname)
	return (
		<>
			{(!props.location.pathname.includes('meeting') && localStorage.getItem('token')) && <LeftNav />}
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
				<Route exact path='/interviewq/history' component={History} />
				<Route
					path='/interviewq/history/coachreport/:key'
					component={CoachReport}
				/>
				<Route
					exact
					path='/interviewq/history/review/:id'
					component={ReviewPage}
				/>
				<Route path='/interviewq/meeting' component={Meeting} />
			</div>
		</>
	);
};

export default InterviewQContainer;
