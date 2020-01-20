import { gql } from 'apollo-boost'


// retrieves information about the user including ReviewerListing, and ResumeReviews as seeker and coach
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
			coach_resume_reviews {
      id
    }
    seeker_resume_reviews {
      id
    }
    reviewerListing{
      id
    }
    }
	}
`;
