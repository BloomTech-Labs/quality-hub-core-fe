import {gql} from 'apollo-boost'

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
		}
	}
`;