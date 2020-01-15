// Resolver functions for Dashboard
import { gql } from 'apollo-boost'

// Gets Listing by User ID (imported into DashResumeQ.js)
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


// Query - Get User's Listing

// Mutation - Delete User's Listing

// Mutation - Update User's Listing

export const UPDATE_USER_LISTING = gql`
    mutation UPDATE_USER_LISTING(
        $id: String!
        $company: String
        $price: Int
        $position: String
        $description: String
        $isPublished: Boolean
    ) {
        updateReviewerListing(
            id: $id
            company: $company
            price: $price
            position: $position
            description: $description
            isPublished: $isPublished
        ) {
            id
            company
            price
            position
            description
            isPublished
        }
    }
`
export const DELETE_LISTING = gql`
	mutation DELETE_LISTING(
        $id: String!
    ) {
        deleteReviewerListing(
            id: $id
        ) {
            id
        }
    }
    `
