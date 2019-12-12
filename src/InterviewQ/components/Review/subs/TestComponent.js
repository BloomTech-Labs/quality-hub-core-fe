import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import { gql } from 'apollo-boost';

const GET_BOOKS = gql`
  query bookings($seeker_id: String!) {
    bookingsBySeeker(seeker_id: $seeker_id) {
      id
      uniquecheck
      review {
        rating
        review
      }
      coach {
        first_name
      }
    }
  }
`
const TestComponent = (props) => {
  let id = localStorage.getItem('id');
  const { data } = useQuery(GET_BOOKS, {variables: { seeker_id: id }})
  return (
    <div>
      List bookings here
      { data && <div>
        { data.bookingsBySeeker.map(booking => 
          <div>
            {booking.coach.first_name}
            {booking.review ? <div>{booking.review.rating} stars: {booking.review.review} </div> : <Link to={{pathname: `/interviewq/test/${booking.uniquecheck}`, state: { firstName: booking.coach.first_name } }}>Submit Review</Link>}
          </div>
        )}
        </div>}
    </div>
  )
}

export default TestComponent;