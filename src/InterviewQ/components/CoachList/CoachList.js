import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import CoachCard from './CoachCard'
import FilterList from './FilterList';
import './CoachList.scss'

const GET_POSTS = gql`
  query {
    posts {
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
  const [fields, setFields] = useState({tag:"", price: "", industry: "", orderBy: ""})
  const [fetchPosts, { loading, error, data }] = useLazyQuery(GET_POSTS, {variables: fields})

  useEffect(() => {
    fetchPosts();
  },[])

    return(
      <div className="coach-list-container">
          {/* <h1>Interview Q</h1>
          <div className="search-box">
            Search Information
            <FilterList fields={fields} setFields={setFields}/>
          </div> */}
        <hr />
        { data && <div className="coach-list">
          {data.posts.map(post => 
            <CoachCard post={post} />
          )}

        </div>
      }
      </div>
    )
}

export default CoachList;
