import React, { useState } from 'react'

import { useQuery, useMutation } from '@apollo/react-hooks'

import { useHistory } from 'react-router-dom'

// resolvers
import { GET_USER_LISTING, UPDATE_USER_LISTING, DELETE_LISTING } from "../Resolvers"

// import child components 2-6
import CoachDashPreviewModal from "./subs/02_CoachDashPreviewModal"
import CompanyInput from "./subs/03_CompanyInput"
import PositionInput from "./subs/04_PositionInput"
import DescriptionInput from "./subs/05_DescriptionInput"
import PriceInput from "./subs/06_PriceInput"

const EditListing = () => {

  const { data, loading } = useQuery(GET_USER_LISTING)
  const [submitUpdates] = useMutation(UPDATE_USER_LISTING)
  const [deleteUserListing, { client }] = useMutation(DELETE_LISTING, {
    refetchQueries: [`GET_USER_LISTING`],
    awaitRefetchQueries: true
  })


  const history = useHistory();

  // console.log(`loading`, loading)
  console.log(`coachListing from query`, data)

  let listingByReviewer = data && data.listingByReviewer;
  const [listing, setListing] = useState(listingByReviewer)
  // console.log(`listing`, listing)

  // handle change assigns newly input values to 'listing' state


  const handleChange = e => {

    if (e.target.name === 'price') {
      setListing({
        ...listing,
        price: parseInt(e.target.value),
      });
      return;
    } else {
      setListing({
        ...listing,
        [e.target.name]: e.target.value,
      });
    }
  };

  // handle change should execute mutation to update listing, passing 'listing' as a value to 'variable' key
  const handleSubmit = e => {
    e.preventDefault();
    console.log(`button clicked, listing`, listing)
    submitUpdates({ variables: listing })
  };

  const deleteListing = () => {
    console.log(`deleteListing for ${listing.id}`)
    deleteUserListing({ variables: { id: listing.id } }).then(res => {
      client.clearStore();
      client.resetStore();
      history.push('/dashboard');
    })
  }

  const handleDelete = e => {
    console.log(`handleDelete`)
    e.preventDefault()
    deleteListing()
  }

  return (
    <div>
      {/* // render child components 2-6 */}
      <CoachDashPreviewModal
        listing={listing}
        setListing={setListing}
        handleChange={handleChange}
      />
      <CompanyInput
        listing={listing}
        setListing={setListing}
        handleChange={handleChange}
      />
      <PositionInput
        listing={listing}
        setListing={setListing}
        handleChange={handleChange}
      />
      <DescriptionInput
        listing={listing}
        setListing={setListing}
        handleChange={handleChange}
      />
      <PriceInput
        listing={listing}
        setListing={setListing}
        handleChange={handleChange}
      />
      <button onClick={handleDelete}>Delete Listing</button>
      <button onClick={handleSubmit}>Submit Changes</button>
    </div>
  )
}

export default EditListing
