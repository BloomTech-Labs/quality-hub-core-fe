import gql from 'apollo-boost'

export const CREATE_REVIEWER_LISTING = gql`
	mutation createReviewerListing(
		$price: Int!
		$position: String!
		$industry: String!
		$description: String!
        $createdAt: DateTime
        $updatedAt: DateTime
		$company: String!
		$isPublished: Boolean!
	) {
		createReviewerListing(
			$price: Int!
            $position: String!
            $industry: String!
            $description: String!
            $createdAt: DateTime
            $updatedAt: DateTime
            $company: String!
            $isPublished: Boolean!
		) {
			id
			price
			position
			industry {
				name
			}
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