import React from 'react';

const AcceptedReviews = ({ reviews }) => {
    console.log('Accepted Reviews', reviews)
    
    return(
        <div>
            <h1>ID: {reviews.id}</h1>
            <h1>Pending: {reviews.isPending ? null : <p>Unavailable</p>}</h1>
            <h1>Accepted: {reviews.isAccepted}</h1>
            <h1>Denied: {reviews.isDenied}</h1>
            <h1>Complete: {reviews.isComplete}</h1>
            <h1>Created: {reviews.createdAt}</h1>
            <h1>Updated: {reviews.updatedAt}</h1>
            <h1>Coach Name: {reviews.coach.first_name}</h1>
            <h1>Seeker Name: {reviews.seeker.first_name}</h1>
        </div>
    )
}

export default AcceptedReviews