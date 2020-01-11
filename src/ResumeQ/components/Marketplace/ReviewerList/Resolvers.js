import { gql } from 'apollo-boost'

// export const GET_INDUSTRIES = gql`
// 	query {
// 		industries {
// 			name
// 		}
// 	}
// `
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
                last_name
                first_name
                bio
                city
                state
                image_url
                portfolio_url
                linkedin_url
                github_url
                personal_url
                blog_url
            }
        }
    }
`
