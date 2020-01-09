import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'

import Loading from '../../../../global/components/Loading';
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


  const { refetch, loading, data } = useQuery(GET_REVIEWER_LISTINGS, {
    fetchPolicy: 'network-only'
  });

  console.log(`REVIEWER_LISTINGS query data`, data)

  // const listings = useQuery(GET_REVIEWER_LISTINGS);
  return (
    <div className='coach-list-container'>
      {/* add routes for components as they're built out */}
      {loading && <Loading />}
      {!loading && data && (
        <div className='coach-list'>
          {data.reviewerListings.map(listing => (
            <ReviewerCard key={listing.id} listing={listing} />
          )
          )}
        </div>
      )}
    </div>
  )
}



export default ReviewerList;
