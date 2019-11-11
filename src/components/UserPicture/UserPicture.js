import React, { useState, useEffect } from 'react';

import './UserPicture.scss';

export default function UserPicture() {
  const [picture, setPicture] = useState(null);

  useEffect(() => {
    if (picture) {
      const formData = new FormData();
      formData.append('image', picture);
    }
  }, [picture]);

  return (
    <div>
      <div className='picture-wrapper'>
        <h2 className='dash-heading'>Picture</h2>
        <input
          className='image-input'
          type='file'
          id='imageInput'
          onChange={e => setPicture(e.target.files[0])}
        />
        <label htmlFor='imageInput'>
          <div
            className='profile-img'
            style={{
              backgroundImage: `url('https://www.gannett-cdn.com/-mm-/c8995a178a2d0111697175844796b5eefe349c58/c=0-0-1935-2580/local/-/media/2016/12/30/Redding/Redding/636186645572972159-birdwords.jpg?width=534&height=712&fit=crop')`,
            }}></div>
        </label>
      </div>
    </div>
  );
}
