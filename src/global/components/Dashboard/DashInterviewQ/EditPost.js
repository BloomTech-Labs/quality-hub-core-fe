// Libraries
import React, {useRef} from 'react';
import { gql } from 'apollo-boost';
import DashboardInput from '../DashboardInput';
import { useQuery, useMutation } from '@apollo/react-hooks';
import PostInput from './PostInput';

const CoachBasicInfo = ({ myArray, userData }) => {



	const GET_COACH_POST = gql `
	query coachPost ($coach_id: String!){
		postByCoach(coach_id: $coach_id) {
			id
			company
			position
			description
			price
			industry{
				id
				name
			}
			tags{
				id
				name
			}
		}
	}
	`
	const { data: coachPost } = useQuery(GET_COACH_POST, {variables: {coach_id: localStorage.getItem('id')}});
	console.log(coachPost);
// 	const UPDATE_POST = gql`
// 	mutation updatePost(
// 		$id: ID! 
// 		$price: Int
// 		$position: String
// 		$industryName: String
// 		$description: String
// 		$tagString: String
// 	) {
// 		updatePost(
// 			id: $id
// 			price: $price
// 			position: $position
// 			industryName: $industryName
// 			description: $description
// 			tagString: $tagString
// 		) {
// 			id
// 			price
// 			position
// 			industryName
// 			description
// 			tagString
// 		}
// 	}
// `;

	const coachInfo = [
		'company',
		// 'industry',
		'position',
		'description',
		// 'tags',
		'price',
	];

	const keyArray = [];

	return (
		<div className='editform'>
			<h2>Basic Info</h2>
		
					{coachPost &&
					coachPost &&
				coachInfo.map(item => {
					if (coachInfo.includes(item)) {
						console.log(coachPost[item])
						return (
							<PostInput
							originalPost={coachPost}
								key={item}
								postKey={item}
								postValue={coachPost.postByCoach[item]}
							/>
						);
					} else {
						return null;
					}
				})}
		</div>
	);
};

export default CoachBasicInfo;