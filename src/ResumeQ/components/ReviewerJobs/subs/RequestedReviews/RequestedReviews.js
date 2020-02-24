import React, { useState, useEffect } from 'react'

import { useQuery, useMutation } from '@apollo/react-hooks'

import ResumeReviewEntry from '../ResumeReviewEntry'
// import Loading from '../../../../../global/components/Loading'

import { REQUESTED_RESUME_REVIEWS, RESPOND_RESUME_REVIEW } from '../../Resolvers'

//SVG IMAGE
import resumeQ1 from '../../../../../global/icons/resumeQ1.svg'

const RequestedReviews = () => {
    const [requestsArray, setRequestsArray] = useState([])

    const { refetch, loading, data
    } = useQuery(REQUESTED_RESUME_REVIEWS, {
        fetchPolicy: 'network-only'
    });

    const [submitResponse] = useMutation(RESPOND_RESUME_REVIEW,
        {
            refetchQueries: [{
                query: REQUESTED_RESUME_REVIEWS,
                variables: {
                    awaitRefetchQueries: true,
                    fetchPolicy: 'network-only'
                },
            }],
            onCompleted: () => {
                console.log(`submitResponse completed`)
                console.log(`submitResponse >> refetchQueries // data`, data)
            },

        });




    // useEffect(() => {
    //     if (!loading) { setRequestsArray(data.requestedResumeReviews) }
    // }, [data])



    // if (!loading) {
    //     console.log(`RequestedReviews / data.requestedResumeReviews`, data.requestedResumeReviews)
    //     console.log(`RequestedReviews / typeof data.requestedResumeReviews`, typeof data.requestedResumeReviews)

    //     !loading && setRequestsArray(data.requestedResumeReviews)

    //     console.log(`RequestedReviews /  requestsArray`, requestsArray)
    // }

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
                {!loading && data.requestedResumeReviews.map(entry => (
                    <ResumeReviewEntry entry={entry} key={entry.id} submitResponse={submitResponse} status={'Pending'} />
                ))}
            </div>
        </div>
    )
}

export default RequestedReviews
