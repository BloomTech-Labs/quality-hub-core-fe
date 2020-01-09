import { gql } from 'apollo-boost'

export const CREATE_REVIEWER_LISTING = gql`
	mutation createReviewerListing(
		$price: Int!
		$position: String!
		$description: String!
		$company: String!
		$isPublished: Boolean!
	) {
		createReviewerListing(
			price: $price
			position: $position
			description: $description
			company: $company
			isPublished: $isPublished
		) {
			id
			price
			position
			description
			createdAt
            updatedAt
			company
			isPublished
			coach {
				last_name
                first_name
			}
		}
	}
`

export const INDUSTRIES = gql`
	query {
		industries {
			name
		}
	}
`;
