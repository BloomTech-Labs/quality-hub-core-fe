// Libraries
import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import CoachCard from './CoachCard';
import Search from '../Search';

import './CoachList.scss';

import Loading from '../../../Core/components/Loading';

export const GET_POSTS = gql`
	query GET_POSTS(
		$industry: String
		$price: String
		$orderBy: String
		$tags: String
	) {
		posts(industry: $industry, price: $price, orderBy: $orderBy, tags: $tags) {
			id
			price
			position
			description
			company
			industry {
				id
				name
			}
			tags {
				id
				name
			}
			coach {
				id
				first_name
				last_name
				city
				state
				image_url
				personal_url
				blog_url
				twitter_url
				portfolio_url
				linkedin_url
				github_url
			}
		}
	}
`;

const CoachList = ({ toggleFilter, setToggleFilter }) => {
	const [fields, setFields] = useState({
		tags: '',
		price: '',
		industry: '',
		orderBy: 'id_ASC',
	});

	const { refetch, loading, data } = useQuery(GET_POSTS);

	return (
		<div className='coach-list-container'>
			{toggleFilter && (
				<Search
					setFields={setFields}
					fields={fields}
					refetch={refetch}
					toggleFilter={toggleFilter}
					setToggleFilter={setToggleFilter}
				/>
			)}
			{/* <hr /> */}
			{loading && <Loading />}
			{!loading && data && (
				<div className='coach-list'>
					{data.posts.map(post => (
						<CoachCard key={post.id} post={post} />
					))}
				</div>
			)}
		</div>
	);
};

export default CoachList;
