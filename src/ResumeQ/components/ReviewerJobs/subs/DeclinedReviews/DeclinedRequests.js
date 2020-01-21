import React from 'react'
import { useQuery } from '@apollo/react-hooks'

import ResumeReviewEntry from '../ResumeReviewEntry'
import Loading from '../../../../../global/components/Loading'

import { DECLINED_RESUME_REVIEWS } from '../../Resolvers'

import '../ReviewJobsCard.scss'


//SVG IMAGE
import resumeQ1 from '../../../../../global/icons/resumeQ1.svg'

const DeclinedRequests = () => {

    const { loading, data } = useQuery(DECLINED_RESUME_REVIEWS, {
        fetchPolicy: 'network-only'
    })

    console.log(`DeclinedRequests / data`, data)

    const declinedArray = !loading && data.declinedResumeReviews.map(review => {
        return {
            ...review,
            status: "Declined"
        }
    })


    return (
        <div>
            {!loading && (!data.declinedResumeReviews.length && (
            <div>
                <div className='resumeQ1'>
                    <img src={resumeQ1} />
                    <p>You currently have no declined reviews at this time...</p>
                </div>
            </div>
            ))}
            {loading && <Loading/>}
            {!loading && declinedArray && (
            <div className="reviewer-jobs-list">
                {declinedArray.map(entry => (
                    <ResumeReviewEntry entry={entry} key={entry.id} />
                ))}
            </div>
            )}
        </div>
    )
}

export default DeclinedRequests
