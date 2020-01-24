import React from 'react';
import { useQuery } from '@apollo/react-hooks'
import { ACCEPTED_REVIEWS_BY_SEEKER } from '../../Resolvers'
import * as moment from 'moment';


// Styling
import '../../subs/SeekerCard.scss'

// Global Imports
import Loading from '../../../../../global/components/Loading'
import { ICONS } from '../../../../../global/icons/iconConstants'
import Icon from '../../../../../global/icons/Icon'

//SVG
import ResumeQ2 from '../../../../../../src/global/icons/resumeQ2.svg'



const AcceptedReviews = () => {

    const { refetch, loading, data } = useQuery(ACCEPTED_REVIEWS_BY_SEEKER, {
        fetchPolicy: 'network-only'
    })

    console.log('Seeker accepted data', data)
    console.log('Seeker loading', loading)

    var format = 'MMM Do YYYY';

    return(
            <div>
            {!loading && (!data.acceptedReviewsBySeeker.length && (
            <div>
            <div className='resumeQ1'>
                <img src={ResumeQ2} />
                <p>You currently have no accepted or denied reviews...</p>

            </div>
        
            </div>
            ))}
            {loading && <Loading />}
            {!loading && data.acceptedReviewsBySeeker && (
                    <div className="seeker-list">
                        {data.acceptedReviewsBySeeker.map(reviews => (
                                <div className="seeker-card">
                                    <div className='seeker-header-container'>
                                        <div className='seeker-card-header'>
                                            <h2>{reviews.seeker.first_name} {reviews.seeker.last_name}</h2>
                                            <p>{reviews.seeker.email}</p>
                                        </div>
                                        
                                        <div className='coach-photo'>
                                        {reviews.seeker.image_url ? (
                                            <img src={reviews.seeker.image_url} alt='Coach Profile Pic' />
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
                                    </div>
                                <div className="seeker-date">
                                    <p>Accepted on: {moment(reviews.dateAccepted).format(format)}</p>
                                    <p>Created on: {moment(reviews.createdAt).format(format)}</p>
                                    <p>Updated on: {moment(reviews.updatedAt).format(format)}</p>
                                </div>

                                <div className="seeker-coach-info">
                                    <h3>Coach Info:</h3>
                                    <p><b>{reviews.coach.first_name} {reviews.coach.last_name}</b></p>
                                    <p>{reviews.coach.email}</p>
                                </div>
                                <button className="contact-seeker-btn">Contact</button>
                            </div>
                        ))}
                    </div>
                
                )}
                
            </div>    
        
    )
}

export default AcceptedReviews


