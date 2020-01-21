import React from 'react'

import { useQuery, useMutation } from '@apollo/react-hooks';
import Loading from '../../../../../global/components/Loading'

import ResumeReviewEntry from '../ResumeReviewEntry'
import { ACCEPTED_RESUME_REVIEWS, UPDATE_RESUME_REVIEW } from '../../Resolvers'

import '../ReviewJobsCard.scss'

//SVG IMAGE
import resumeQ1 from '../../../../../global/icons/resumeQ1.svg'

const AcceptedReviews = () => {

    const { loading, data, refetch } = useQuery(
        ACCEPTED_RESUME_REVIEWS, {
        fetchPolicy: 'network-only'
    }
    )

    const [updateResumeReview] = useMutation(UPDATE_RESUME_REVIEW, {
        refetchQueries: [`ACCEPTED_RESUME_REVIEWS`],
        awaitRefetchQueries: true
    })

    console.log(`AcceptedReviews / data`, data)

    const acceptedArray = !loading && data.acceptedResumeReviews.map(review => {
        return {
            ...review,
            status: "In Progress"
        }
    })

    return (
        <div>
            {!loading && (!data.acceptedResumeReviews.length && (
            <div>
                <div className='resumeQ1'>
                    <img src={resumeQ1} />
                    <p>You currently have no accepted reviews at this time...</p>
                </div>
            </div>
                ))}
            {loading && <Loading/>}
            {!loading && acceptedArray && (
            <div className="reviewer-jobs-list">
                {acceptedArray.map(entry => (
                    <ResumeReviewEntry entry={entry} key={entry.id} updateResumeReview={updateResumeReview} refetch={refetch}/>
                ))}
            </div>
            )}
        </div>
    )
}

export default AcceptedReviews
