import React from 'react'

import { useQuery, useMutation } from '@apollo/react-hooks';
import Loading from '../../../../../global/components/Loading'

import {COMPLETED_RESUME_REVIEWS, UPDATE_RESUME_REVIEW} from '../../Resolvers'

import ResumeReviewEntry from '../ResumeReviewEntry'

//SVG IMAGE
import resumeQ1 from '../../../../../global/icons/resumeQ1.svg'

const ReviewsHistory = () => {

    const { loading, data } = useQuery(
        COMPLETED_RESUME_REVIEWS, {
        fetchPolicy: 'network-only'
    }
)

    const [updateResumeReview] = useMutation(UPDATE_RESUME_REVIEW, {
        refetchQueries: [`COMPLETED_RESUME_REVIEWS`],
        awaitRefetchQueries: true
    })

    const completedArray = !loading && data.completedResumeReviews.map(review => {
        return {
            ...review,
            status: "Completed"
        }
    })

    return (
        <div>
            {!loading && (!data.completedResumeReviews.length && (
            <div>
                <div className='resumeQ1'>
                    <img src={resumeQ1} />
                    <p>You currently have no accepted reviews at this time...</p>

                </div>
            </div>
            ))}
            {loading && <Loading/>}
            {!loading && completedArray && (
            <div className="reviewer-jobs-list">
                {completedArray.map(entry => (
                    <ResumeReviewEntry entry={entry} key={entry.id} />
                ))}
            </div>
            )}
        </div>
    )
}

export default ReviewsHistory