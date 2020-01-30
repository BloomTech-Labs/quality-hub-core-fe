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

export const GET_REVIEWS_BY_SEEKER = gql`
	query {
		users {
			id
			email
			seeker_resume_reviews {
				id
				isPending
				isAccepted
				isDenied
				isComplete
				coach {
					id
					email
				}
			}
			coach_resume_reviews {
				id
				isPending
				isAccepted
				isDenied
				isComplete
				seeker {
					id
					email
				}
			}
		}
	} 
`