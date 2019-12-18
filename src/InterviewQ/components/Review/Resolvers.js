import { gql } from 'apollo-boost';

export const CREATE_REVIEW = gql`
  mutation createReview( $uniqueBooking: String! $rating: Int! $review: String!) { 
    createReview(
      uniqueBooking: $uniqueBooking 
      rating: $rating 
      review: $review
    ){
      id
      rating
      review
  }
}`;
