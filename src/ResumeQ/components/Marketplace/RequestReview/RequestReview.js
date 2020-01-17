import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { CREATE_RESUME_REVIEW, GET_USER } from '../../Marketplace/Resolvers'

const RequestReview = props => {
    // console.log(`RequestReview / props`, props)
    const { history } = props
    const { location: { state: { listing } } } = props
    const { coach } = listing
    // console.log(`RequestReview / listing`, listing)
    const [message, setMessage] = useState('')
    const [requestResumeReview] = useMutation(CREATE_RESUME_REVIEW);

    // console.log(`RequestReview / coach.id`, coach.id)



    const handleCancel = e => {
        e.preventDefault()
        console.log(`ReviewerList > handleCancel`)
        history.push('/resumeq')
        // if this component is a modal then it should simply close the modal w/o making a push to history. That way the current list of reviewrs are displayed according to their most recent filters
    }

    const handleSubmit = e => {
        requestResumeReview({
            variables: {
                coach: coach.id
            }
        }).then(res => {
            setMessage(`Request sent!`)
            setTimeout(() => {
                history.push('/resumeq')
            }, 1250)
        }).catch(err => {
            const errStr = err.toString().replace('Error: GraphQL error: ', '')
            errStr.includes('Request between seeker and coach already exists') && setMessage(`You have already sent ${coach.first_name} a request. Please wait for them to respond or complete their review.`)
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
            {/* error message container*/}
            <div>
                <p>{message}</p>
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
