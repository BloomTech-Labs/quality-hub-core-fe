import React from 'react';
import { useQuery } from '@apollo/react-hooks'
import { ACCEPTED_REVIEWS_BY_SEEKER } from '../../Resolvers'

// Styling
import '../../subs/SeekerCard.scss'

// Global Imports
import Loading from '../../../../../global/components/Loading'
import { ICONS } from '../../../../../global/icons/iconConstants'
import Icon from '../../../../../global/icons/Icon'


const AcceptedReviews = () => {

    const { refetch, loading, data } = useQuery(ACCEPTED_REVIEWS_BY_SEEKER, {
        fetchPolicy: 'network-only'
    })

    console.log('Seeker accepted data', data)
    console.log('Seeker loading', loading)

    // if(loading){
    //     return (
    //         <div><p>Loading...</p></div>
    //     )
    // } else {

    return(
            <div>
            {!loading && (!data.acceptedReviewsBySeeker.length && (<div><p>You currently have no accepted or denied reviews...</p></div>))}
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
                                <div>
                                    <p>Date Accepted: {reviews.dateAccepted}</p>
                                    <p>Date Created: {reviews.createdAt}</p>
                                    <p>Date Updated: {reviews.updatedAt}</p>
                                </div>

                                <div>
                                    <h3>Coach Info:</h3>
                                    <p>Name: {reviews.coach.first_name} {reviews.coach.last_name}</p>
                                    <p>Email: {reviews.coach.email}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                
                )}
                
            </div>    
        
    )
}
// }

export default AcceptedReviews


