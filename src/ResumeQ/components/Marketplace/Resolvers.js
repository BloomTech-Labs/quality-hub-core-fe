import { gql } from 'apollo-boost'

export const GET_USER = gql`
	query {
		me {
			id
			first_name
			last_name
			linkedin_url
			twitter_url
			city
			state
			image_url
			reviewerListing {
				id
				description
			}
		}
	}
`;

export const GET_INDUSTRIES = gql`
	query {
		industries {
			name
		}
	}
`


export const CREATE_RESUME_REVIEW = gql`
	mutation createResumeReview(
		$coach: String!
		$name: String!
		) {
		createResumeReview(
			coach: $coach
			name: $name
			isPending: true
			isDenied: false
			isComplete: false
			isAccepted: false
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
