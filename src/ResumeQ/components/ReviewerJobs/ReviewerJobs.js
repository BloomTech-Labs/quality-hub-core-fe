import React from 'react'
import { NavLink, Route } from 'react-router-dom'

import './LeftNav.scss'

import RequestedReview from './subs/RequestedReviews'
import AcceptedReviews from './subs/AcceptedReviews'
import DeclinedReviews from './subs/DeclinedReviews'
import ReviewsHistory from './subs/ReviewsHistory'


const ReviewerJobs = () => {

    // This component holds components for each type of ResumeReview entry. Each entry contains its own state and queries

    function openTab(tab) {
        let tabs = document.getElementsByClassName('requestTab');
        for (let i = 0; i < tabs.length; i++) {
            tabs[i].style.display = 'none';
        }
        document.getElementById(tab).style.display = 'block';
    }

    return (
        <div className="reviewer-jobs-container">

            <div className='QNav-row'>

                <NavLink to='/resumeq/reviewerjobs/' className='SeekerQNav-btn'>Requests</NavLink>
                <NavLink to='/resumeq/reviewerjobs/accepted' className='SeekerQNav-btn'>Accepted</NavLink>
                <NavLink to='/resumeq/reviewerjobs/declined' className='SeekerQNav-btn'>Declined</NavLink>
                <NavLink to='/resumeq/reviewerjobs/history' className='SeekerQNav-btn'>History</NavLink>


                {/* <button onClick={() => openTab('requests')} className='SeekerQNav-btn'>Pending</button>
                <button onClick={() => openTab('accepted')} className='SeekerQNav-btn'>Accepted</button>
                <button onClick={() => openTab('declined')} className='SeekerQNav-btn'>Declined</button>
                <button onClick={() => openTab('history')} className='SeekerQNav-btn'>History</button> */}
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
