// Libraries
import React, { useState, useEffect } from 'react';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

<<<<<<< HEAD
import CoachCard from './CoachCard'
import Search from '../Search';

import './CoachList.scss'

const GET_POSTS = gql`
  query GET_POSTS($industry: String, $price: String, $orderBy: String, $tags: String){
    posts (industry: $industry, price: $price, orderBy: $orderBy, tags: $tags) {
      price
      position
      description
      industry {
        name
      }
      tags {
        name
      }
      coach {
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
`

const CoachList = () => {
  const [fields, setFields] = useState({tags:"", price: "", industry: "", orderBy: "id_ASC"});
  const { refetch, loading, error, data } = useQuery(GET_POSTS);
    return(
      <div className="coach-list-container">
        <Search setFields={setFields} fields={fields} refetch={refetch}/>
        <hr />
        { !loading && data && <div className="coach-list">
          {data.posts.map(post => 
            <CoachCard post={post} />
          )}

        </div>
      }
      </div>
    )
}
=======
// Styles
import './CoachList.scss';

//Components
import CoachCard from './CoachCard';
import FilterList from './FilterList';

const GET_POSTS = gql`
	query {
		posts {
			id
			price
			position
			description
			industry {
				name
			}
			tags {
				id
				name
			}
			coach {
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

const CoachList = () => {
	const [fields, setFields] = useState({
		tag: '',
		price: '',
		industry: '',
		orderBy: '',
	});
	const [fetchPosts, { loading, error, data }] = useLazyQuery(GET_POSTS, {
		variables: fields,
	});

	useEffect(() => {
		fetchPosts();
	}, []);

	return (
		<div className='coach-list-container'>
			{/* <h1>Interview Q</h1>
          <div className="search-box">
            Search Information
            <FilterList fields={fields} setFields={setFields}/>
          </div> */}
			{/* <hr /> */}
			{data && (
				<div className='coach-list'>
					{data.posts.map(post => (
						<CoachCard key={post.id} post={post} />
					))}
				</div>
			)}
		</div>
	);
};
>>>>>>> 672bb36ecfcf1dbe82dc352e241743acb29ed7ad

export default CoachList;
