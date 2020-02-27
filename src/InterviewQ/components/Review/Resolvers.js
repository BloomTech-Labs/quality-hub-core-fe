import { gql } from "apollo-boost";

export const CREATE_REVIEW = gql`
  mutation createReview(
    $uniqueBooking: String!
    $rating: Int!
    $review: String!
    $microservice: String!
  ) {
    createReview(
      uniqueBooking: $uniqueBooking
      rating: $rating
      review: $review
    ) {
      id
      rating
      review
    }
  }
`;

export const CREATE_REVIEW_FOR_COACH_TO_USE = gql`
  mutation createReport(
    $uniqueBooking: String!
    $firstImpression_rating: Int!
    $resume_rating: Int!
    $professionalism_rating: Int!
    $generalAttitude_rating: Int!
    $technicalProficiency_rating: Int!
    $contentOfAnswers_rating: Int!
    $communication_rating: Int!
    $firstImpression_comment: String!
    $resume_comment: String!
    $professionalism_comment: String!
    $generalAttitude_comment: String!
    $technicalProficiency_comment: String!
    $contentOfAnswers_comment: String!
    $communication_comment: String!
  ) {
    createReport(
      uniqueBooking: $uniqueBooking
      firstImpression_rating: $firstImpression_rating
      resume_rating: $resume_rating
      professionalism_rating: $professionalism_rating
      generalAttitude_rating: $generalAttitude_rating
      technicalProficiency_rating: $technicalProficiency_rating
      contentOfAnswers_rating: $contentOfAnswers_rating
      communication_rating: $communication_rating
      firstImpression_comment: $firstImpression_comment
      resume_comment: $resume_comment
      professionalism_comment: $professionalism_comment
      generalAttitude_comment: $generalAttitude_comment
      technicalProficiency_comment: $technicalProficiency_comment
      contentOfAnswers_comment: $contentOfAnswers_comment
      communication_comment: $communication_comment
    ) {
      id
    }
  }
`;

export const GET_SEEKER_BOOKINGS = gql`
  query getSeekerHistory($seeker_id: String!) {
    bookingsBySeeker(seeker_id: $seeker_id) {
      id
      year
      month
      day
      hour
      minute
      price
      coach {
        id
        first_name
        last_name
        # post {
        # 	id
        # 	price
        # }
      }
      uniquecheck
      report {
        firstImpression_rating
        firstImpression_comment
        resume_rating
        resume_comment
        professionalism_rating
        professionalism_comment
        generalAttitude_rating
        generalAttitude_comment
        technicalProficiency_rating
        technicalProficiency_comment
        contentOfAnswers_rating
        contentOfAnswers_comment
        communication_rating
        communication_comment
        createdAt
        isSent
      }
      review {
        id
        rating
        review
      }
    }
  }
`;
