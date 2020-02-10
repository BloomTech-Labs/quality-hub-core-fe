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

    return (
        <div>
            {!loading && (!data.acceptedResumeReviewsBySeeker.length && (
                <div>
                    <div className='resumeQ1'>
                        <img src={ResumeQ2} />
                        <p>You currently have no accepted or denied reviews...</p>

                    </div>

                </div>
            ))}
            {loading && <Loading />}
            {!loading && data.acceptedResumeReviewsBySeeker && (
                <div className="seeker-list">
                    {data.acceptedResumeReviewsBySeeker.map(reviews => (
                        <div className="seeker-card" key={reviews.id}>
                            <div className='seeker-header-container'>

                                <div className='coach-photo'>
                                    {reviews.coach.image_url ? (
                                        <img src={reviews.coach.image_url} alt='Coach Profile Pic' width="95" height="95" />
                                    ) : (
                                            <div className='blank-image'>
                                                <Icon
                                                    icon={ICONS.BLANK_AVATAR}
                                                    color='white'
                                                    width={90}
                                                    height={90}
                                                />
                                            </div>
                                        )}
                                </div>

                            </div>

                            <div className='seeker-card-info'>
                                <h1>{reviews.coach.first_name} {reviews.coach.last_name}</h1>
                                <p>{reviews.coach.email}</p>
                            </div>

                            <div className="seeker-date">
                                <p><b>Created on </b>{moment(reviews.createdAt).format(format)}</p>
                                <div className="v1"></div>
                                <span className="dot1"></span><p className="acc-text"> <b className="green">Accepted on</b> {moment(reviews.dateAccepted).format(format)}</p>
                            </div>


                            <button className="contact-seeker-btn"><a href={`mailto:${reviews.coach.email}`}>Contact</a></button>
                        </div>
                    ))}
                </div>

            )}

        </div>

    )
}

export default AcceptedReviews
