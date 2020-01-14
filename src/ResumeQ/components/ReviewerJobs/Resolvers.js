import { gql } from 'apollo-boost'


// get requested ResumeReviews
export const REQUESTED_RESUME_REVIEWS = gql`
    query { requestedResumeReviews {
          id
          isPending
          isAccepted
          isDenied
          isComplete
          createdAt
          updatedAt
          dateAccepted
          dateCompleted
          coach {
            id
            first_name
            last_name
            email
          }
          seeker {
            id
            first_name
            last_name
            email
          }
  }}
`

// get accepted and in-progress ResumeReviews
export const ACCEPTED_RESUME_REVIEWS = gql`
    query { acceptedResumeReviews {
         id
          isPending
          isAccepted
          isDenied
          isComplete
          createdAt
          updatedAt
          dateAccepted
          dateCompleted
          coach {
            id
            first_name
            last_name
            email
          }
          seeker {
            id
            first_name
            last_name
            email
          }
    }}
`

// get completed ResumeReviews
export const COMPLETED_RESUME_REVIEWS = gql`
    query { completedResumeReviews {
          id
          isPending
          isAccepted
          isDenied
          isComplete
          createdAt
          updatedAt
          dateAccepted
          dateCompleted
          coach {
            id
            first_name
            last_name
            email
          }
          seeker {
            id
            first_name
            last_name
            email
          }
    }}
`

// get denied ResumeReviews
export const DECLINED_RESUME_REVIEWS = gql`
  query { declinedResumeReviews {
        id
          isPending
          isAccepted
          isDenied
          isComplete
          createdAt
          updatedAt
          dateAccepted
          dateCompleted
          coach {
            id
            first_name
            last_name
            email
          }
          seeker {
            id
            first_name
            last_name
            email
          }
  }}
`


// mutations for ResumeReviews

// accept or deny request

export const RESPOND_RESUME_REVIEW = gql`
  mutation respondResumeReview(
    id: String!
    isPending: Boolean!
    isAccepted: Boolean!
    isDenied: Boolean!
    ){
      id: $ID
      isPending: $isPending
      isAccepted: $isAccepted
      isDenied: $isDenied
    } {
      id
      isPending
      isAccepted
      isDenied
    }
`
export const UPDATE_RESUME_REVIEW = gql`
    mutation updateResumeReview(

    )
`
