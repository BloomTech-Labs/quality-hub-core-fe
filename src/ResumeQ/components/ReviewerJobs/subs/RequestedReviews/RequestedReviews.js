import React from 'react'

import { useQuery, useMutation } from '@apollo/react-hooks'

import ResumeReviewEntry from '../ResumeReviewEntry'
import { REQUESTED_RESUME_REVIEWS, RESPOND_RESUME_REVIEW } from '../../Resolvers'

const RequestedReviews = () => {

    const { refetch, loading, data } = useQuery(REQUESTED_RESUME_REVIEWS, {
        fetchPolicy: 'network-only'
    });

    const [submitResponse] = useMutation(RESPOND_RESUME_REVIEW,
        {
            refetchQueries: [`REQUESTED_RESUME_REVIEWS`],
            awaitRefetchQueries: true
        })



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
            {!loading && requestArray.map(entry => (
                <ResumeReviewEntry entry={entry} key={entry.id} submitResponse={submitResponse} />
            ))}
        </div>
    )
}

export default RequestedReviews
