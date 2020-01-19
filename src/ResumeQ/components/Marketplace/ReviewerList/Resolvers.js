import { gql } from 'apollo-boost'

<<<<<<< HEAD

=======
// export const GET_INDUSTRIES = gql`
// 	query {
// 		industries {
// 			name
// 		}
// 	}
// `
>>>>>>> fafd99157e8199bf78ef9bbe3fe47523bd4a2665
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
<<<<<<< HEAD
            id
            first_name
            last_name
            city
            state
            image_url
            bio
            }
        }

=======
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
>>>>>>> fafd99157e8199bf78ef9bbe3fe47523bd4a2665
    }
`
