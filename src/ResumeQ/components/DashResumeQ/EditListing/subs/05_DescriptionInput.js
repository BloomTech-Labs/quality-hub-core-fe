import React from "react"


const DescriptionInput = ({ listing, setListing, handleChange }) => {


  return (
    <div>
      <p>Description:{listing.description}</p>
      <textarea
        id='edit-post-3'
        type='textarea'
        name='description'
        value={listing.description}
        onChange={handleChange}
      />
    </div>
  )
}

export default DescriptionInput
