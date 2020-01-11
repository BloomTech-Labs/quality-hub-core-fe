import React from 'react';

const CompanyInput = ({ listing, setListing, handleChange }) => {


  return (
    <div>
      <h4>Company</h4 >
      <p>{listing.company}</p>
      <input
        id="edit-post-0"
        name='company'
        value={listing.company}
        onChange={handleChange}
      />
    </div>
  )
}

export default CompanyInput
