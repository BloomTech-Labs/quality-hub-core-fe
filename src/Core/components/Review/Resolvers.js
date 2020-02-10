import { gql } from 'apollo-boost';

export const CREATE_REVIEW = gql`
  mutation createReview($input: ReviewInput!) { 
    createReview(
	  input: $input
    ){
      id
      rating
      review
  }
}`;

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
				id
				strengths
				growthAreas
				suggestions
				additionalComments
			}
			review {
				id
				rating
				review
			}
		}
	}
`;

export const REVIEW_BY_JOB_ID = gql`
	query reviewByJobId($id: String!){
		reviewByJobId(
			id: $id
		) {
			id
			rating
			review
		}
	} 
`
