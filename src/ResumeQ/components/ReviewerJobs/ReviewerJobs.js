import React from 'react'

import './LeftNav.scss'

import RequestedReview from './subs/RequestedReviews'
import AcceptedReviews from './subs/AcceptedReviews'
import DeclinedReviews from './subs/DeclinedReviews'
import ReviewsHistory from './subs/ReviewsHistory'
import { MarketplacePanels } from '../Marketplace/ReviewerList/subs/2_Panels/MarketplacePanels'

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
            <MarketplacePanels />
            <div className='QNav-row'>
                <button onClick={() => openTab('requests')} className='SeekerQNav-btn'>Pending</button>
                <button onClick={() => openTab('accepted')} className='SeekerQNav-btn'>Accepted</button>
                <button onClick={() => openTab('declined')} className='SeekerQNav-btn'>Declined</button>
                <button onClick={() => openTab('history')} className='SeekerQNav-btn'>History</button>
            </div>
            <div id='requests' className='requestTab'>
                <h1>Requested Reviews</h1>
                <RequestedReview />
            </div>
            <div id='accepted' className='requestTab' style={{display: 'none'}}>
                <h1>Reviews in Progress</h1>
                <AcceptedReviews />
            </div>
            <div id='declined' className='requestTab' style={{display: 'none'}}>
                <h1>Declined Reviews</h1>
                <DeclinedReviews />
            </div>
            <div id='history' className='requestTab' style={{display: 'none'}}>
                <h1>Completed Reviews</h1>
                <ReviewsHistory />
            </div>
        </div>
    )
}

export default ReviewerJobs
