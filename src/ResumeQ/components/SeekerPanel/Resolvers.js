import { gql } from 'apollo-boost'

export const RESUME_REVIEWS_BY_SEEKER = gql`
query{
    resumeReviewsBySeeker{
        id
        isPending
        isAccepted
        isDenied
        isComplete
        createdAt
        updatedAt
        dateAccepted
        dateCompleted
        coach{
            id
            first_name
            last_name
        }
        seeker{
            id
            first_name
            last_name
        }
    }
}
`