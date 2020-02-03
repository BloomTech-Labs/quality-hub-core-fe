import { gql } from 'apollo-boost'

export const GET_USER = gql`
	query {
		me {
			id
			first_name
			last_name
			linkedin_url
			twitter_url
			city
			state
			image_url
			reviewerListing {
				id
				description
			}
			resume_reviews_as_coach{
				id
				isPending
				isAccepted
				isDenied
				isComplete
    }
    	resume_reviews_as_seeker{
				id
				isPending
				isAccepted
				isDenied
				isComplete
    }
		}
	}
`;

export const GET_INDUSTRIES = gql`
	query {
		industries {
			name
		}
	}
`
