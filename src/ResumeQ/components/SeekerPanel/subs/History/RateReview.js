import React from 'react';
import { Link, Route } from 'react-router-dom';


import { useQuery, useMutation } from '@apollo/react-hooks';
import { COMPLETED_REVIEWS_BY_SEEKER } from '../../Resolvers';
import ReviewForm from '../../../../../Core/components/Review/subs/1_ReviewForm'
// import ReviewPage from '../../../../../core/components/Review/ReviewPage'
import Loading from '../../../../../global/components/Loading'
import { ICONS } from '../../../../../global/icons/iconConstants'
import Icon from '../../../../../global/icons/Icon'

import * as moment from 'moment';

//SVG
import ResumeQ2 from '../../../../../../src/global/icons/resumeQ2.svg'


const RateReviews = () => {

    const { refetch, loading, data } = useQuery(COMPLETED_REVIEWS_BY_SEEKER, {
        fetchPolicy: 'network-only'
    })

    console.log('RateReviews', data)
    var format = 'MMM Do YYYY';


    return(
        <div>
            <h2>Rate Reviews Here!</h2>
            {/**Use useState to grab id and coach name to pass to reviewForm**/}
            {/* <ReviewPage location={window.location} history={window.history}/> */}
            {!loading && (!data.completedResumeReviewsBySeeker.length && (
            <div>
            <div className='resumeQ1'>
                <img src={ResumeQ2} />
                <p>You currently have no completed reviews...</p>

            </div>
        
            </div>
            ))}
            {loading && <Loading />}
            {!loading && data.completedResumeReviewsBySeeker && (
                <div className="seeker-list">
                    {data.completedResumeReviewsBySeeker.map(review => (
                        <div className="seeker-card" key={review.id}>
                            <div className="seeker-header-container">
                                <div className="coach-photo">
                                    {review.seeker.image_url ? (
                                        <img src={review.seeker.image_url}  alt='Coach Profile Pic' width="95" height="95"/>
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
                                <h1>{review.coach.first_name}{review.coach.last_name}</h1>
                                <p>{review.coach.email}</p>
                            </div>
                            <div className="seeker-date">
                                    <p><b>Created on </b>{moment(review.createdAt).format(format)}</p>
                                    <div className="v1"></div>
                                    <span className="dot1"></span><p className="acc-text"> <b className="green">Accepted on</b> {moment(review.dateAccepted).format(format)}</p>
                            </div>

                            {/*<div className="seeker-review">
                                {!data.completedResumeReviewsBySeeker.rating && (
                                    
                                ) }   
                                    </div>*/}

                                
                                <Link to={`/resumeq/seekerpanel/rating/${review.id}`} className='review-button button cancel'>Leave Review</Link>
                        </div>
                    ))}
                    </div>
            )}
        </div>
    )
}

export default RateReviews