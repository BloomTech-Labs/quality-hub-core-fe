// Libraries
import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';

// ID needs to be removed. Backend should pull user ID from token, find current post, then use that to edit post. 
export const UPDATE_POST = gql`
	mutation updatePost(
		$id: ID! 
		$price: Int
		$position: String
		$industryName: String
		$description: String
		$tagString: String
	) {
		updatePost(
			id: $id
			price: $price
			position: $position
			industryName: $industryName
			description: $description
			tagString: $tagString
		) {
			id
			price
			position
			industryName
			description
			tagString
		}
	}
`;

export default function EditPost() {
	return (
		<div>
			<h3>Edit Post</h3>
		</div>
	);
}
