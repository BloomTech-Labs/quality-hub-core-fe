import { gql } from 'apollo-boost'

export const GET_INDUSTRIES = gql`
	query {
		industries {
			name
		}
	}
`
export const RESUME_Q = gql`
    query {
        resumeQinfo
    }
`

export const GET_REVIEWER_LISTINGS = gql`
    query {
        reviewerListings{
            id
            price
            position
            industry
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

export const ADD_LISTING = gql`
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
`;
