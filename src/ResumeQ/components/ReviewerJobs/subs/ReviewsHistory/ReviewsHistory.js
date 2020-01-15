import React from 'react'

import { useQuery, useMutation } from '@apollo/react-hooks';
import Loading from '../../../../../global/components/Loading'

import {COMPLETED_RESUME_REVIEWS, UPDATE_RESUME_REVIEW} from '../../Resolvers'

import ResumeReviewEntry from '../ResumeReviewEntry'

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
            status: "In Progress"
        }
    })

    return (
        <div>
            {loading && <Loading/>}
            {!loading && completedArray && (
            <div>
                {completedArray.map(entry => (
                    <ResumeReviewEntry entry={entry} key={entry.id} />
                ))}
            </div>
            )}
        </div>
    )
}

export default ReviewsHistory