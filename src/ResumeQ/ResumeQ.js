import React from 'react';
import { Route } from 'react-router-dom';

//local imports 
import Marketplace from './components/Marketplace'
import ListingForm from './components/ListingForm'
import RequestReview from './components/Marketplace/RequestReview'
import DashResumeQ from './components/DashResumeQ'
<<<<<<< HEAD
import SeekerPanel from './components/SeekerPanel/SeekerPanel'
import ReviewerJobs from './components/ReviewerJobs'
=======
>>>>>>> fafd99157e8199bf78ef9bbe3fe47523bd4a2665

const ResumeQContainer = () => {

  return (
    <>
      <div>
<<<<<<< HEAD
        <div>
          <Route exact path='/resumeq/marketplace' component={Marketplace} />
          <Route path='/resumeq/becomeacoach' component={ListingForm} />
          <Route path='/resumeq/settings' component={DashResumeQ} />
          <Route path='/resumeq/request' component={RequestReview} />
          <Route path='/resumeq/seekerpanel' component={SeekerPanel} />
          <Route path='/resumeq/reviewerjobs' component={ReviewerJobs} />
=======
        {/* add routes for components as they're built out */}
        <div>
          <Route exact path='/resumeq' component={Marketplace} />
          <Route path='/resumeq/becomeacoach' component={ListingForm} />
          {/* <Route path='/resumeq/request' component={RequestReview} /> */}
          <Route path='/resumeq/settings' component={DashResumeQ} />
          <Route path='/resumeq/request' component={RequestReview} />
>>>>>>> fafd99157e8199bf78ef9bbe3fe47523bd4a2665
        </div>
      </div>
    </>
  )
}

<<<<<<< HEAD
=======

>>>>>>> fafd99157e8199bf78ef9bbe3fe47523bd4a2665
export default ResumeQContainer;
