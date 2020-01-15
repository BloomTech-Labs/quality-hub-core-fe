import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { CREATE_RESUME_REVIEW, GET_USER } from '../../Marketplace/Resolvers'

const RequestReview = props => {

    const { history } = props
    console.log(`RequestReview / props`, props)
    const { listing } = props.location.state
    const { coach } = listing
    console.log(`RequestReview / listing`, listing)

    const [requestResumeReview] = useMutation(CREATE_RESUME_REVIEW);

    console.log(`RequestReview / coach.id`, coach.id)

    const handleCancel = e => {
        e.preventDefault()
        console.log(`ReviewerList > handleCancel`)
        history.push('/resumeq')
        // if this component is a modal then it should simply close the modal w/o making a push to history. That way the current list of reviewrs are displayed according to their most recent filters
    }

    const handleSubmit = e => {
        console.log(`RequestReview > handleSubmit`)
        requestResumeReview({
            variables: {
                coach: coach.id
            }
        })
    }

    return (
        <>
            <div>
                <h1>Request Review</h1>
                <p>You are requesting a resumé review from {coach.first_name} {coach.last_name}.</p>
                <hr />
                <p>You will be charged ${listing.price} after {coach.first_name} accepts the review.</p>
            </div>
            {/* // buttons for cancelling or confirming request. */}
            <div>
                <button onClick={handleCancel}>
                    Cancel
            </button>

                <button onClick={handleSubmit}>
                    Confirm Request
            </button>
            </div>
        </>
    )
}

export default RequestReview
