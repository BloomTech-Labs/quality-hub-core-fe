import React from 'react';
import { useQuery } from '@apollo/fedaration'
import Loading from '../../../../../global/components/Loading'
import { DENIED_REVIEWS_BY_SEEKER} from '../../Resolvers'
import './DeniedReviews.scss'

const DeniedReviews = () => {

    const { refetch, loading, data } = useQuery(DENIED_REVIEWS_BY_SEEKER,{
        fetchPolicy: 'network-only'
    })

    console.log('DENIED data', data)
    
    return(
        <div className="denied-by-seeker">
        {loading && <Loading />}
        {!loading && data.deniedReviewsBySeeker && (
            <div>
                {data.deniedReviewsBySeeker.map(reviews => (
                    <div className="denied-by-seeker-card">
                        <p>ID: {reviews.id}</p>
                        <p>Denied: {reviews.isDenied}</p>
                        <p>Date Created: {reviews.createdAt}</p>
                        <p>Date Updated:{reviews.updatedAt}</p>
                        <p>Coach ID{reviews.coach.id}</p>
                        <p>Coach Name:{reviews.coach.first_name} {reviews.coach.last_name}</p>
                        <p>{reviews.coach.last_name}</p>
                        <p>{reviews.coach.email}</p>
                        <p>{reviews.seeker.id}</p>
                        <p>{reviews.seeker.first_name}</p>
                        <p>{reviews.seeker.last_name}</p>
                        <p>{reviews.seeker.email}</p>
                    </div>
                ))}
            </div>
        )}
        </div>
    )
}

export default DeniedReviews