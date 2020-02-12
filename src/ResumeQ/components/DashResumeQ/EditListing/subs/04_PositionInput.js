import React from 'react';

const PositionInput = ({ listing, setListing, handleChange }) => {

  return (
    <div>
      <h2>Position</h2>
      <input
        id='edit-post-1'
        name='position'
        value={listing.position}
        onChange={handleChange}
      />
    </div>
  );
};

export default PositionInput;
