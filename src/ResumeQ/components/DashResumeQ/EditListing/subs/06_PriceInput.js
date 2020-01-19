import React from 'react';

const PriceInput = ({ listing, setListing, handleChange }) => {

  // TODO add text to indicate the maximum and minimum values
  return (
    <div>
      <h4>Price Per Review</h4>
      <p>${listing.price}</p>
      <input
        id='edit-post-4'
        name='price'
        type='range'
        min='0'
        max='200'
        value={listing.price}
        onChange={handleChange}
        step='1'
      />
    </div>
  );
};

export default PriceInput;
