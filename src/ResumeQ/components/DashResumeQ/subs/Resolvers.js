import { gql } from 'apollo-boost';

export const UPDATE_POST = gql`
mutation updateReviewerListing(
  $id: String! 
  $price: Int
  $position: String
  $company: String
  $description: String
  $isPublished: Boolean
) {
  updateReviewerListing(
    id: $id
    price: $price
    position: $position
    company: $company
    description: $description
    isPublished: $isPublished
  ) {
    id
    price
    position
    company
    description
    isPublished
  }
}
`

export const GET_INDUSTRIES = gql`
	query {
		industries {
			name
		}
	}
`;

export const GET_USERS_LISTING = gql`
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

export const GET_COACH_POST = gql`
query reviewerListing ($id: String!){
  reviewerListing(id: $id){
    id
    price
    position
    industry
    description
    company
    isPublished
    coach{
      id
      first_name
      last_name
      email
      reviewerListing{
        id
        price
        position
        industry
        description
        company
      }
    }
  }
}
`

// GraphQL Mutation to delete post associated with user
export const DELETE_POST = gql`
	mutation {
		deleteReviewerListing {
			id
		}
	}
`;