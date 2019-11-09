import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

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
      <PictureWrapper>
        <DashHeading>Picture</DashHeading>
        <ImageInput
          type='file'
          id='imageInput'
          onChange={e => setPicture(e.target.files[0])}
        />
        <label htmlFor='imageInput'>
          <ProfileImg />
        </label>
      </PictureWrapper>
    </div>
  );
}

const PictureWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const DashHeading = styled.h2`
  width: 100px;
  text-align: left;
`;

const ImageInput = styled.input`
  opacity: 0;
  position: absolute;
  pointer-events: none;
`;

const ProfileImg = styled.div`
  border-radius: 50%;
  width: 100px;
  height: 100px;
  background-size: cover;
  background-repeat: no-repeat;
  background-color: gray;
  cursor: pointer;
`;
