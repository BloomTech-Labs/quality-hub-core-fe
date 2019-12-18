import React, { useState } from 'react';
import PostButtons from './01_PostButtons';

const CompanyInput = ({ original, post, handleChange, handleCancel, handleSubmit}) => {

  const [editing, setEditing] = useState(false);

  return (
    <div className='dash-input'>
    <div className='dash-row post-row'>
      <span className='dash-heading'>
        <h3>COMPANY</h3>
      </span>
      {editing[0] ? (
        <div>
          <input
            id='edit-post-0'
            defaultValue={original && original.company}
            name='company'
            value={post.company}
            onChange={handleChange}
          />
        </div>
      ) : (
        <div>
          <p>{original && original.company}</p>
        </div>
      )}
    </div>
    <PostButtons
      index={0}
      editing={editing}
      setEditing={setEditing}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
    />
  </div>
  )
}

export default CompanyInput;