import React from 'react'

import { useQuery } from '@apollo/react-hooks'

import ReviewerCard from './subs/1_ReviewerCard'
import Search from './subs/0_Search'

import './ReviewerList.scss'

import {
  GET_REVIEWER_LISTINGS,
  RESUME_Q
} from './Resolvers'

// this is a stateful component which will hold the list of reviewers and render each to a card component

const ReviewerList = () => {
  const listings = useQuery(GET_REVIEWER_LISTINGS);
  return (
    <>
      <div>
        {/* add routes for components as they're built out */}
        <h1>ReviewerList Component</h1>
        {listings.data && (
          listings.data.reviewerListings.map(listing => {
            return <ReviewerCard key={listing.id} listing={listing} />
          }))}
      </div>
    </>
  )
}

<div className='coach-list-container'>
  {/* <div className={toggleFilter ? '' : 'hidden'}> */}
  <Search
    setFields={setFields}
    fields={fields}
    refetch={refetch}
    toggleFilter={toggleFilter}
    setToggleFilter={setToggleFilter}
  />
  {/* </div> */}
  {loading && <Loading />}
  {!loading && data && (
    <div className='coach-list'>
      {console.log(data.posts[0])}
      {data.posts.map(post => (
        <CoachCard key={post.id} post={post} history={history} />
      ))}
    </div>
  )}
</div>
	);

export default ReviewerList;
