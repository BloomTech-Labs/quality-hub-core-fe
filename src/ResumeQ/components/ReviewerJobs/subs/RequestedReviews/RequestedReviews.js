import React from 'react'

import { useQuery, useMutation } from '@apollo/react-hooks'

import ResumeReviewEntry from '../ResumeReviewEntry'
// import Loading from '../../../../../global/components/Loading'

import { REQUESTED_RESUME_REVIEWS, RESPOND_RESUME_REVIEW } from '../../Resolvers'

//SVG IMAGE
import resumeQ1 from '../../../../../global/icons/resumeQ1.svg'

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
            {!loading && (!data.requestedResumeReviews.length && (
            <div>
                <div className='resumeQ1'>
                    <img src={resumeQ1} />
                    <p>You currently have no pending reviews at this time...</p>
                </div>
            </div>
            ))}
            <div className="reviewer-jobs-list">
            {!loading && requestArray.map(entry => (
                <ResumeReviewEntry entry={entry} key={entry.id} submitResponse={submitResponse} />
                ))}
            </div>
        </div>
    )
}

export default RequestedReviews
