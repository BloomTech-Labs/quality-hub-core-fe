import React, { useState } from 'react'

import { useQuery } from '@apollo/react-hooks'

import ReviewerCard from './subs/1_ReviewerCard'
// import Search from './subs/0_Search'

import './ReviewerList.scss'

import {
  GET_REVIEWER_LISTINGS,

} from './Resolvers'

// this is a stateful component which will hold the list of reviewers and render each to a card component

const ReviewerList = () => {
  const [fields, setFields] = useState({
    price: '',
    orderBy: "id_ASC"
  })


  const { refect, loading, data } = useQuery(GET_REVIEWER_LISTINGS, {
    fetchPolicy: 'network-only'
  });

  console.log(`REVIEWER_LISTINGS query data`, data)

  // const listings = useQuery(GET_REVIEWER_LISTINGS);
  return (
    <>
      <div>
        {/* add routes for components as they're built out */}
        <h1>ReviewerList Component</h1>
        {data && (
          data.reviewerListings.map(listing => {
            return <ReviewerCard key={listing.id} listing={listing} />
          }))}
      </div>
    </>
  )
}



export default ReviewerList;
