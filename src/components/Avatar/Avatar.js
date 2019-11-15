import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import axios from "axios";
import "./Avatar.scss";

// Remember to export queries for testing
export const GET_IMG = gql`
  query {
    me {
      id
      image_url
    }
  }
`;

export const EDIT_IMG = gql`
  mutation EditImage($image_url: String) {
    update(image_url: $image_url) {
      image_url
    }
  }
`;

export default function Avatar() {
  const [picture, setPicture] = useState(null);

  const { data } = useQuery(GET_IMG);

  // The editImage mutation sends the profile picture URL to the backend database and also updates the cache (application state)
  const [editImage] = useMutation(EDIT_IMG, {
    update(
      cache,
      {
        data: {
          update: { image_url }
        }
      }
    ) {
      const { me } = cache.readQuery({ query: GET_IMG });
      cache.writeQuery({
        query: GET_IMG,
        data: { me: { ...me, image_url } }
      });
    }
  });

  // Use FormData to upload profile picture to Cloudinary and then send the returned URL to the backend database
  // Both 'file' and 'upload_preset' are required for Cloudinary!
  useEffect(() => {
    if (picture) {
      const formData = new FormData();
      formData.append("file", picture);
      formData.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET);

      axios
        .post(
          `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
          formData
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
        className="image-input"
        type="file"
        id="imageInput"
        onChange={e => setPicture(e.target.files[0])}
      />
      <label htmlFor="imageInput">
        <div className="img-wrapper">
          <div
            className="profile-img"
            style={{
              backgroundImage: `url('${data && data.me.image_url}')`
            }}
          >
            {!data && <p className="add-image">Edit Image</p>}
          </div>
          <div className="edit-image">
            <p>Edit Image</p>
          </div>
        </div>
      </label>
    </div>
  );
}
