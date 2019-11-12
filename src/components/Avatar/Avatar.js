import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import axios from 'axios';
import './Avatar.scss';

import { cloudName, uploadPreset } from '../../secrets';

const GET_IMG = gql`
  query {
    me {
      id
      image_url
    }
  }
`;

const EDIT_IMG = gql`
  mutation EditImage($image_url: String) {
    update(image_url: $image_url) {
      image_url
    }
  }
`;

export default function Avatar() {
  const [picture, setPicture] = useState(null);

  const { data } = useQuery(GET_IMG);
  const [editImage] = useMutation(EDIT_IMG, {
    update(
      cache,
      {
        data: {
          update: { image_url },
        },
      },
    ) {
      const { me } = cache.readQuery({ query: GET_IMG });
      cache.writeQuery({
        query: GET_IMG,
        data: { me: { ...me, image_url } },
      });
    },
  });

  useEffect(() => {
    if (picture) {
      const formData = new FormData();
      formData.append('file', picture);
      formData.append('upload_preset', uploadPreset);

      axios
        .post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          formData,
        )
        .then(res => {
          editImage({ variables: { image_url: res.data.secure_url } });
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
        <div className='img-wrapper'>
          <div
            className='profile-img'
            style={{
              backgroundImage: `url('${data && data.me.image_url}')`,
            }}>
            {!data && <p className='edit-image'>Edit Image</p>}
          </div>
          <div className='hover'>
            <p>Edit Image</p>
          </div>
        </div>
      </label>
    </div>
  );
}
