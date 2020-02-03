import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/react-hooks'

import Icon from '../../../../global/icons/Icon';
import { ICONS } from '../../../../global/icons/iconConstants';
import Loading from '../../../../global/components/Loading'

import RecentReviews from './subs/RecentReviews';

import './RequestReview.scss'

import { CREATE_RESUME_REVIEW } from './Resolvers'

const RequestReview = props => {
    console.log(`RequestReview / props`, props)

    const { history } = props
    const { location: { state: { listing } } } = props
    const { coach } = listing



    // ! rename this state
    const [submitFeedback, setSubmitFeedback] = useState({
        success: null,
        message: '',
    })
    const [requestResumeReview] = useMutation(CREATE_RESUME_REVIEW);

    const handleCancel = e => {
        e.preventDefault()
        history.push('/resumeq/marketplace')
        // if this component is a modal then it should simply close the modal w/o making a push to history. That way the current list of reviewrs are displayed according to their most recent filters
    }

    // handleSubmit attempts a mutation to initiate a ResumeReview. If errors are returned, submitFeedback will update.
    const handleSubmit = e => {
        e.preventDefault()
        requestResumeReview({
            variables: {
                coach: coach.id
            }
        }).then(res => {
            setSubmitFeedback({
                success: true,
                message: `Request sent!`
            })
            setTimeout(() => {
                history.push('/resumeq/marketplace')
            }, 1500)
        }).catch(err => {
            const errStr = err.toString().replace('Error: GraphQL error: ', '')
            errStr.includes('Request between seeker and coach already exists') && setSubmitFeedback({
                success: false,
                message: `You have already sent ${coach.first_name} a request. Please wait for them to respond or complete their review.`
            })
            errStr.includes('A review between user and coach is already in progress.') && setSubmitFeedback({
                success: false,
                message: `${coach.first_name} is currently reviewing your resumé.`
            })
        })
    }



    return (
        <>
            <div>
                <h1 id='rq-confirm-title'>Confirm Request</h1>

                <div className="rq-request-coach-container">
                    <div className='rq-requested-coach'>
                        <div className='rq-requested-coachcard-header'>
                            <div className="rq-info-container">
                                <div className='coach-photo'>
                                    {coach.image_url ? (
                                        <img src={coach.image_url} alt='Coach Profile Pic' height="140" width="140" />
                                    ) : (
                                            <div className='blank-image'>
                                                <Icon
                                                    icon={ICONS.BLANK_AVATAR}
                                                    color='white'
                                                    width={80}
                                                    height={90}
                                                />
                                            </div>
                                        )}
                                </div>
                                {/* adjust style sheet so that the full name will be displayed */}
                                <div className='rq-requested-coachcard-header-txt'>
                                    <h1>
                                        {coach.first_name} {coach.last_name}
                                    </h1>

                                </div>
                                <div className='coachcard-info'>
                                    <div className="info-content">
                                        <span className='coachcard-icon industry'>
                                            <Icon icon={ICONS.BAG} width={18} height={18} color='#595959' />
                                        </span>
                                        <span className='text'>{`${listing.company} - ${listing.position}`}</span>
                                    </div>
                                    <div className="info-content">
                                        <span className='coachcard-icon'>
                                            <Icon
                                                icon={ICONS.LOCATION}
                                                width={18}
                                                height={17}
                                                color='#595959'
                                            />
                                        </span>
                                        <span className='coachcard-posloc'>
                                            {coach.city}, {coach.state}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className='coachcard-description'>
                                <p>{listing.description}</p>
                            </div>
                            <span className="price-tag">{listing.price === 0 ? 'Free' : `$${listing.price}`}</span>
                        </div>
                        <div className='rq-confirm-coach-bio'>
                            <h3>About {coach.first_name}</h3>
                            <p>{coach.bio || 'User has not uploaded a biography.'}</p>
                        </div>

                        {coach.reviewsReceived[0] && (<div className='rq-recent-reviews'>
                            <h3>Recent Reviews</h3>
                            {coach.reviewsReceived.map(review => <RecentReviews review={review} key={review.id} />)}
                        </div>)}
                    </div>
                </div>

                <div className="rq-confirm-container">
                    <div>
                        {submitFeedback.success === null && (<p>You are requesting a resumé review from {coach.first_name}. Once they have accepted your request, you will be charged ${listing.price}</p>)}

                    </div>
                    {submitFeedback.success && (<div className="success-checkmark">
                        <div className="check-icon">
                            <span className="icon-line line-tip"></span>
                            <span className="icon-line line-long"></span>
                            <div className="icon-circle"></div>
                            <div className="icon-fix"></div>
                        </div>
                    </div>)}
                    <p className={submitFeedback.success ? 'rq-confirm-success' : 'rq-confirm-failure'}>{submitFeedback.message}</p>

                    <div className='confirmation-container'>
                        <button className='rq-cancel-request-button' onClick={handleCancel}>
                            Cancel
                       </button>
                        <button className='rq-confirm-request-button' onClick={handleSubmit}>
                            Confirm Request
                         </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RequestReview
