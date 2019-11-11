import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Image } from 'cloudinary-react';
import './Avatar.scss';

export default function Avatar() {
  const [picture, setPicture] = useState(null);
  const [cloudinaryData, setCloudinaryData] = useState('');

  useEffect(() => {
    if (picture) {
      const formData = new FormData();
      formData.append('file', picture);
      formData.append('upload_preset', 'vlvqk9zi');

      axios
        .post(
          `https://api.cloudinary.com/v1_1/hpzwvtjsz/image/upload`,
          formData,
        )
        .then(res => {
          console.log(res);
          setCloudinaryData(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [picture]);

  return (
    <div>
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
        {/* <Image
          cloudName={process.env.REACT_APP_CLOUD_NAME}
          publicId={publicId}
        /> */}
      </label>
    </div>
  );
}
