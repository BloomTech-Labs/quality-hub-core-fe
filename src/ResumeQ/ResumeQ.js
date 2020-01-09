import React from 'react';
import { Route } from 'react-router-dom';

//local imports 
import Marketplace from './components/Marketplace'
import ListingForm from './components/ListingForm'
import RequestReview from './components/Marketplace/RequestReview'
import DashResumeQ from './components/DashResumeQ'

const ResumeQContainer = () => {

  return (
    <>
      <div>
        {/* add routes for components as they're built out */}
        <h3>Resumé Q</h3>
        <p>Welcome to Resumé Q</p>
        <div>
          <Route path='/resumeq/reviewers' component={Marketplace} />
          <Route path='/resumeq/becomeacoach' component={ListingForm} />
          {/* <Route path='/resumeq/request' component={RequestReview} /> */}
          <Route path='/resumeq/settings' component={DashResumeQ} />
        </div>
      </div>
    </>
  )
}


export default ResumeQContainer;
