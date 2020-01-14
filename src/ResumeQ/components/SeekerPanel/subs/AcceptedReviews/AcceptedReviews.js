import React from 'react';
import { useQuery } from '@apollo/react-hooks'
import Loading from '../../../../../global/components/Loading'
import { ACCEPTED_REVIEWS_BY_SEEKER } from '../../Resolvers'
import '../../subs/SeekerCard.scss'

const AcceptedReviews = () => {

    const { refetch, loading, data } = useQuery(ACCEPTED_REVIEWS_BY_SEEKER, {
        fetchPolicy: 'network-only'
    })

    console.log('Seeker accepted data', data)
    console.log('Seeker loading', loading)
    return(
        <div className="seeker-container">
        {loading && <Loading />}
        {!loading && data.acceptedReviewsBySeeker && (
            <div>
                {data.acceptedReviewsBySeeker.map(reviews => (
                    <div className="seeker-card">
                        <p>ID: {reviews.id}</p>
                        <p>Accepted: {reviews.isAccepted}</p>
                        <p>Date Accepted: {reviews.dateAccepted}</p>
                        <p>Date Created: {reviews.createdAt}</p>
                        <p>Date Updated: {reviews.updatedAt}</p>
                        <p>Coach ID:{reviews.coach.id}</p>
                        <p>Coach Name: {reviews.coach.first_name} {reviews.coach.last_name}</p>
                        <p>Coach Email: {reviews.coach.email}</p>
                        <p>Seeker ID: {reviews.seeker.id}</p>
                        <p>Seeker Name: {reviews.seeker.first_name} {reviews.seeker.last_name}</p>
                        <p>Seeker Email: {reviews.seeker.email}</p>
                    </div>
                ))}
            </div>
        )}
        </div>
    )
}

export default AcceptedReviews


