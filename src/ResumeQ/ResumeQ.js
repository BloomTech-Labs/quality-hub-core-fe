import React from 'react';
import { Route } from 'react-router-dom';

//local imports 
import Marketplace from './components/Marketplace'
import ListingForm from './components/ListingForm'
import RequestReview from './components/Marketplace/RequestReview'
import DashResumeQ from './components/DashResumeQ'
import SeekerPanel from './components/SeekerPanel/SeekerPanel'
import ReviewerJobs from './components/ReviewerJobs'
import SideNavigation from './components/SideNavigation';


const ResumeQContainer = () => {

  return (
    <>
      <div>
        <div>
          <SideNavigation />
          <Route exact path='/resumeq/marketplace' component={Marketplace} />
          <Route path='/resumeq/becomeacoach' component={ListingForm} />
          <Route path='/resumeq/settings' component={DashResumeQ} />
          <Route path='/resumeq/request' component={RequestReview} />
          <Route path='/resumeq/seekerpanel' component={SeekerPanel} />
          <Route path='/resumeq/reviewerjobs' component={ReviewerJobs} />
        </div>
      </div>
    </>
  )
}

export default ResumeQContainer;
