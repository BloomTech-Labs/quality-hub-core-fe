import React from 'react'

import { useQuery } from '@apollo/react-hooks'


import RequestedReview from './subs/RequestedReviews'
import AcceptedReviews from './subs/AcceptedReviews'
import DeclinedReviews from './subs/DeclinedReviews'
import ReviewsHistory from './subs/ReviewsHistory'

const ReviewerJobs = () => {

    // This component holds components for each type of ResumeReview entry. Each entry contains its own state and queries

    return (
        <div>
            <div className='requestTab'>
                <h1>Requested Reviews</h1>
                <RequestedReview />
            </div>
            <div className='requestTab' >
                <h1>Reviews in Progress</h1>
                <AcceptedReviews />
            </div>
            <div className='requestTab' >
                <h1>Declined Reviews</h1>
                <DeclinedReviews />
            </div>
            <div className='requestTab' >
                <h1>Past Reviews</h1>
                <ReviewsHistory />
            </div>
        </div>
    )
}

export default ReviewerJobs
