import { gql } from 'apollo-boost'

export const GET_COACH_LISTING_INFO = gql`
query {
  user($id: String!){
    first_name
    last_name
    id
  	bio
    reviewerListing{
      id
      price
      description
      industry
    }
	reviewsReceived(microservice: "RESUMEQ"){
    id
    rating
    review
    seeker{
      first_name
      image_url
    }
  }
  }
  }
}

`

export const CREATE_RESUME_REVIEW = gql`
	mutation CREATE_RESUME_REVIEW(
		$coach: String!
		) {
		createResumeReview(
			coach: $coach
		) {
			id
			coach {
				id
				first_name
				last_name
			}
			seeker {
				id
				first_name
				last_name
			}
		}
	}
`
