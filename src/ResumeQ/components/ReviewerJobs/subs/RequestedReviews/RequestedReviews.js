import React from 'react'

import { useQuery } from '@apollo/react-hooks'

import ResumeReviewEntry from '../ResumeReviewEntry'
import { REQUESTED_RESUME_REVIEWS } from '../../Resolvers'

const RequestedReviews = () => {

    const { refetch, loading, data } = useQuery(REQUESTED_RESUME_REVIEWS, {
        fetchPolicy: 'network-only'
    });

    console.log(`RequestedReviews / data`, data)

    const requestArray = !loading && data.requestedResumeReviews.map(review => {
        return {
            ...review,
            status: "Pending"
        }

    })

    console.log(`RequestedReview / requestArray`, requestArray)

    return (
        <div>
            {!loading && requestArray.map(request => (
                <ResumeReviewEntry request={request} key={request.id} />
            ))}
        </div>
    )
}

export default RequestedReviews
