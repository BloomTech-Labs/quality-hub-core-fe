import { gql } from 'apollo-boost'

export const UPDATE_REVIEWER_LISTING = gql`
	mutation updateReviewerListing(
		$id: String!
		$price: Int!
		$position: String!
		$description: String!
		$company: String!
		$isPublished: Boolean!
	) {
		updateReviewerListing(
			id: $id
			price: $price
			position: $position
			description: $description
			company: $company
			isPublished: $isPublished
		) {
			
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

export const GET_USER_LISTING = gql`
query {
  listingByReviewer{
    id
    company
    price
    position
    description
    isPublished
  }
}
`
