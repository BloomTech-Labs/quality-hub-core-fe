import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'

import Loading from '../../../../global/components/Loading';
import ReviewerCard from './subs/1_ReviewerCard'
import Search from './subs/0_Search'

import './ReviewerList.scss'

import {
<<<<<<< HEAD
  GET_REVIEWER_LISTINGS
} from './Resolvers'
import { MarketplacePanels } from './subs/2_Panels/MarketplacePanels';
=======
  GET_REVIEWER_LISTINGS,
} from './Resolvers'
>>>>>>> fafd99157e8199bf78ef9bbe3fe47523bd4a2665

// this is a stateful component which will hold the list of reviewers and render each to a card component

const ReviewerList = ({ history }) => {
  const [fields, setFields] = useState({
    price: '',
    description: '',
    orderBy: "id_ASC"
  })
<<<<<<< HEAD
=======
  console.log(`history object`, history)
>>>>>>> fafd99157e8199bf78ef9bbe3fe47523bd4a2665

  const { refetch, loading, data } = useQuery(GET_REVIEWER_LISTINGS, {
    fetchPolicy: 'network-only'
  });

  console.log(`ReviewerList / data`, data)
<<<<<<< HEAD

  !loading && data && data.reviewerListings.map(listing => console.log(`reviewerListings.map`, listing))


  return (
    <div className='coach-list-container'>
      {/* add routes for components as they're built out */}
      <MarketplacePanels />
=======
  console.log(`ReviewerList / loading`, loading)

  !loading && data && data.reviewerListings.map(listing => console.log(`reviewerListings.map`, listing))

  // const listings = useQuery(GET_REVIEWER_LISTINGS);
  return (
    <div className='coach-list-container'>
      {/* add routes for components as they're built out */}
>>>>>>> fafd99157e8199bf78ef9bbe3fe47523bd4a2665
      <Search
        setFields={setFields}
        fields={fields}
        refetch={refetch}
      // toggleFilter={toggleFilter}
      // setToggleFilter={setToggleFilter}
      />
      {loading && <Loading />}
<<<<<<< HEAD
      {(!loading && data.reviewerListings) && (
=======
      {!loading && data && (
>>>>>>> fafd99157e8199bf78ef9bbe3fe47523bd4a2665
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
