import React from 'react'
import { NavLink, Route } from 'react-router-dom'

import './LeftNav.scss'

import RequestedReview from './subs/RequestedReviews'
import AcceptedReviews from './subs/AcceptedReviews'
import DeclinedReviews from './subs/DeclinedReviews'
import ReviewsHistory from './subs/ReviewsHistory'


const ReviewerJobs = () => {

    // This component holds components for each type of ResumeReview entry. Each entry contains its own state and queries

    return (
        <div className="reviewer-jobs-container">

            <div className='QNav-row'>

                <NavLink exact to='/resumeq/reviewerjobs/' className='SeekerQNav-btn'>Requests</NavLink>
                <NavLink to='/resumeq/reviewerjobs/accepted' className='SeekerQNav-btn'>Accepted</NavLink>
                <NavLink to='/resumeq/reviewerjobs/declined' className='SeekerQNav-btn'>Declined</NavLink>
                <NavLink to='/resumeq/reviewerjobs/history' className='SeekerQNav-btn'>History</NavLink>


            </div>

            <Route exact path='/resumeq/reviewerjobs/'>
                <RequestedReview />
            </Route>

            <Route exact path='/resumeq/reviewerjobs/accepted'>
                <AcceptedReviews />
            </Route>

            <Route exact path='/resumeq/reviewerjobs/declined'>
                <DeclinedReviews />
            </Route>

            <Route exact path='/resumeq/reviewerjobs/history'>
                <ReviewsHistory />
            </Route>
        </div>
    )
}

export default ReviewerJobs
