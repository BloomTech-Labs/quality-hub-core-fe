import { gql } from 'apollo-boost'


export const RESUME_Q = gql`
    query {
        resumeQinfo
    }
`

// TODO add sort feature by rating
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
              average_coach_rating(microservice: "RESUMEQ")
              ratingsReceived(microservice: "RESUMEQ")
              reviewsReceived(microservice: "RESUMEQ" first: 3){
                id
                rating
                review
                seeker{
                  first_name
                  image_url
                  }
                }
              }
            }
    }
`
export const GET_COACH_REVIEWS = gql`
query user($id: ID!) {
  user(id: $id){
    reviewsReceived(microservice: "RESUMEQ" first: 3){
      id
      rating
      review
      seeker{
        first_name
        image_url
      }
    }
  }
}
`
