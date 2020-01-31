import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { DENIED_REVIEWS_BY_SEEKER } from '../../Resolvers'
import * as moment from 'moment';


// Styling
import '../../subs/SeekerCard.scss'

// Global Imports
import Loading from '../../../../../global/components/Loading'
import { ICONS } from '../../../../../global/icons/iconConstants'
import Icon from '../../../../../global/icons/Icon'

//SVG
import ResumeQ2 from '../../../../../../src/global/icons/resumeQ2.svg'


const DeniedReviews = () => {

    const { refetch, loading, data } = useQuery(DENIED_REVIEWS_BY_SEEKER, {
        fetchPolicy: 'network-only'
    })

    console.log('DENIED data', data)

    var format = 'MMM Do YYYY';

    return (
        <div>
            {!loading && (!data.deniedResumeReviewsBySeeker.length && (

                <div>
                    <div className='resumeQ1'>
                        <img src={ResumeQ2} />
                        <p>You currently have no accepted or denied reviews...</p>
                    </div>
                </div>

            ))}
            {loading && <Loading />}
            {!loading && data.deniedResumeReviewsBySeeker && (
                <div className="seeker-list">
                    {data.deniedResumeReviewsBySeeker.map(denied => (

                        <div className="seeker-card">
                            <div className="seeker-header-container">

                                <div className='coach-photo'>
                                    {denied.seeker.image_url ? (
                                        <img src={denied.seeker.image_url} alt='Coach Profile Pic' />
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

                            <div className="seeker-card-info">
                                <h1>{denied.coach.first_name} {denied.coach.last_name}</h1>
                            </div>

                            <div className="seeker-date-denied">
                                <p><b>Created on </b>{moment(denied.createdAt).format(format)}</p>
                                <div className="v1"></div>
                                <span class="dot2"></span><p className="acc-text"> <b className="red">Denied on</b> {moment(denied.dateAccepted).format(format)}</p>
                            </div>



                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}


export default DeniedReviews
