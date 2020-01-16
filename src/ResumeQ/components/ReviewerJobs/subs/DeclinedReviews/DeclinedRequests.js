import React from 'react'
import { useQuery } from '@apollo/react-hooks'

import ResumeReviewEntry from '../ResumeReviewEntry'
import Loading from '../../../../../global/components/Loading'

import { DECLINED_RESUME_REVIEWS } from '../../Resolvers'


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
            {!loading && (!data.declinedResumeReviews.length && (<div><p>You currently have no declined reviews at this time...</p></div>))}
            {loading && <Loading/>}
            {!loading && declinedArray && (
            <div>
                {declinedArray.map(entry => (
                    <ResumeReviewEntry entry={entry} key={entry.id} />
                ))}
            </div>
            )}
        </div>
    )
}

export default DeclinedRequests
