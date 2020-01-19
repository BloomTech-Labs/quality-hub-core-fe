import { gql } from 'apollo-boost'


export const RESUME_Q = gql`
    query {
        resumeQinfo
    }
`

export const GET_REVIEWER_LISTINGS = gql`
    query GET_REVIEWER_LISTINGS(
        $description: String
        $price: String
        $orderBy: String
    )  {
        reviewerListings(
            description: $description
            price: $price
            orderBy: $orderBy
            ){
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
            id
            first_name
            last_name
            city
            state
            image_url
            bio
            }
        }

    }
`
