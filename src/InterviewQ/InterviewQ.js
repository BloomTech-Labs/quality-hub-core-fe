import React from "react";
import InterviewLandingPage from "../InterviewQ/components/LandingPage";
import DashInterviewQ from "./components/DashInterviewQ";
import CoachForm from "./components/CoachForm/CoachForm";
import CoachList from "./components/LandingPage/CoachList";
import LeftNav from "./components/LeftNav/LeftNav";
import { Route } from "react-router-dom";
import Booking from "./components/RequestInterview";
import ReviewPage from "./components/Review";
import ConfirmedInterview from "./components/RequestInterview/subs/02_ConfirmedInterview";
import History from "./components/History";
import CoachReport from "./components/CoachReport/CoachReport";
import Meeting from "./components/Meeting/subs/Room";
import Inbox from "../Core/components/Messaging/Inbox";
import Room from "./components/Meeting/subs/Room";
import Schedule from "./components/History/subs/Schedule/Schedule";
import WeekView from "./components/History/subs/Schedule/WeekView.js";
import CoachReviewForm from './components/CoachReport/CoachReportStars/CoachReview_Form';
// import Stripe from '../global/components/Stripe';

//Auth0
import { useAuth0 } from "../global/auth/react-auth0-spa";

const InterviewQContainer = props => {
  // console.log(props.location.pathname);

  const { isAuthenticated } = useAuth0();

  return (
    <>
      {!props.location.pathname.includes("meeting") && isAuthenticated && (
        <LeftNav />
      )}
      <div className="arranged-marriage">
        <Route exact path="/interviewq" component={InterviewLandingPage} />
        <Route path="/interviewq/addcoach" component={CoachForm} />
        <Route path="/interviewq/coachlist" component={CoachList} />
        <Route path="/interviewq/booking" component={Booking} />
        <Route path="/interviewq/settings" component={DashInterviewQ} />
        <Route
          path="/interviewq/interviewconfirmed"
          component={ConfirmedInterview}
        />
        <Route exact path="/interviewq/history" component={History} />
        <Route exact path='/interviewq/history/coachreport/:key' component={CoachReviewForm} />
        <Route
          exact
          path="/interviewq/history/review/:id"
          component={ReviewPage}
        />
        <Route exact path="/interviewq/schedule" component={Schedule} />
        <Route exact path="/interviewq/week" component={WeekView} />
        {/* <Route path='/interviewq/meeting' component={Meeting} /> */}
        <Route path="/interviewq/inbox" component={Inbox} />
        {/* <Route path='/interviewq/meeting' component={Room} /> */}
        <Route
          path="/interviewq/meeting"
          render={props => (
            <Room
              {...props}
              unique={window.localStorage.getItem("uniquecheckid")}
              myName={localStorage.getItem("first_name")}
            />
          )}
        />
        {/* render={props => <LandingPage {...props} />} */}
        {/* <Route path='/interviewq/stripe'>
					<Stripe />
				</Route> */}
      </div>
    </>
  );
};

export default InterviewQContainer;
