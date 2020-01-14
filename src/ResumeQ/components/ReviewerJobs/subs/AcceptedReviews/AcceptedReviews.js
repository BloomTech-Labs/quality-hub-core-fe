import React from 'react'

import { useQuery } from 'apollo/react-hooks';

import ResumeReviewEntry from '../ResumeReviewEntry'
import { ACCEPTED_RESUME_REVIEWS } from '../../Resolvers'


const AcceptedReviews = ({ reviews }) => {
    console.log('Accepted Reviews', reviews)

    return (
        <div>

        </div>
    )
}

export default AcceptedReviews
