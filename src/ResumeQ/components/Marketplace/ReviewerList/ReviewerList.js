import React from 'react'

import {useQuery, useMutation} from '@apollo/react-hooks'

import ReviewerCard from './subs/1_ReviewerCard'

import { 
  GET_INDUSTRIES, 
  GET_REVIEWER_LISTINGS,
  ADD_LISTING
} from './Resolvers'

// this is a stateful component which will hold the list of reviewers and render each to a card component



const ReviewerList = () => {
  // const { refetch, loading, data } = useQuery(GET_INDUSTRIES, { fetchPolicy: "network-only"});
  const data = useQuery(GET_REVIEWER_LISTINGS);
  const newListing = useMutation(ADD_LISTING);
  console.log(data)
  return (
    <>
      <div>
        {/* add routes for components as they're built out */}
        <h1>ReviewerList Component</h1>
      </div>
    </>
  )
}


export default ReviewerList;
