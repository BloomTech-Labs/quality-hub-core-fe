import React from 'react';
import { Route } from 'react-router-dom';

//local imports 
import Marketplace from './components/Marketplace'
import ListingForm from './components/ListingForm'
import RequestReview from './components/Marketplace/RequestReview'
import DashResumeQ from './components/DashResumeQ'
import SeekerPanel from './components/SeekerPanel/SeekerPanel'

const ResumeQContainer = () => {

  return (
    <>
      <div>
        {/* add routes for components as they're built out */}
        <div>
          <Route exact path='/resumeq' component={Marketplace} />
          <Route path='/resumeq/becomeacoach' component={ListingForm} />
          {/* <Route path='/resumeq/request' component={RequestReview} /> */}
          <Route path='/resumeq/settings' component={DashResumeQ} />
          <Route path='/resumeq/request' component={RequestReview} />
          <Route path='/resumeq/seekerpanel' component={SeekerPanel} />
        </div>
      </div>
    </>
  )
}


export default ResumeQContainer;
