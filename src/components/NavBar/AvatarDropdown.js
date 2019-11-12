import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { gql } from "apollo-boost";
import { useLazyQuery } from "@apollo/react-hooks";

import { useQuery, useMutation } from "@apollo/react-hooks";

import axios from "axios";

const GET_USER = gql`
  query dropdownMenu {
    me {
      id
      first_name
      last_name
      email
      city
      state
      image_url
      gender
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

const AvatarDropdown = props => {
  const [picture, setPicture] = useState(null);
  const [getUser, { client, loading, data }] = useLazyQuery(GET_USER);
  const node = useRef();
  const [open, setOpen] = useState(false);

  const [editImage] = useMutation(EDIT_IMG, {
    update(
      cache,
      {
        data: {
          update: { image_url }
        }
      }
    ) {
      const { me } = cache.readQuery({ query: GET_USER });
      cache.writeQuery({
        query: GET_USER,
        data: { me: { ...me, image_url } }
      });
    }
  });

  const logout = () => {
    document.removeEventListener("mousedown", handleOutsideClick);
    setOpen(false);
    client.clearStore();
    props.logout();
  };

  //If you click outside the dropdown menu, the menu will close.
  const handleOutsideClick = e => {
    if (props.loggedin) {
      if (node.current) {
        if (node.current.contains(e.target)) {
          return;
        }
        setOpen(false);
      }
    }
  };

  useEffect(() => {
    if (picture) {
      const formData = new FormData();
      formData.append("file", picture);
      formData.append(
        "upload_preset",
        process.env.REACT_APP_UPLOAD_PRESET
      );

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

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    getUser();
  }, [open]);

  return (
    <div ref={node}>
      <img
        src="avatar.png"
        alt="Grid Menu"
        className="avatar-menu"
        onClick={e => setOpen(!open)}
      />
      {open && (
        <div className="dropdown-content">
          <div className="dropdown-avatar-camera">
            <input
              className="image-input-dropdown"
              type="file"
              id="imageInput"
              onChange={e => setPicture(e.target.files[0])}
            />
            <label htmlFor="imageInput-2">
              <div className="img-wrapper-dropdown">
                <div
                  className="profile-img-dropdown"
                  style={{
                    backgroundImage: `url('${data && data.me.image_url}')`
                  }}
                >
                  {/* {!data && <p className="add-image">Add Image</p>} */}
                </div>
                {/* <div className="edit-image">
                <p>Edit Image</p>
              </div> */}
              </div>
            </label>
            {/* Avatar image in dropdown menu */}
            {/* {data && (
              <img
                src={data.me.image_url || "avatar.png"}
                alt="Profile avatar"
                className="avatar-submenu"
              />
            )} */}
            {/* This is the offset camera icon */}
            <label htmlFor="imageInput" className="camera-label">
              <div className="dropdown-camera-icon grey-on-hover">&#x1F4F7;</div>
            </label>
          </div>
          {data && (
            <p className="dropdown-menu-name">
              {data.me.first_name + " " + data.me.last_name}
            </p>
          )}
          {data && <p className="dropdown-menu-email">{data.me.email}</p>}

          {/* Need to link to dashboard */}
          <Link to="/dashboard">
            <button className="manage-btn">
              Manage your Quality Hub account
            </button>
          </Link>
          <hr />
          {/* Need to add sign out functionality */}
          <Link to="/">
            <button className="signout-btn" onClick={() => logout()}>
              Sign Out
            </button>
          </Link>
          <hr />
          <div className="dropdown-menu-links-div">
            {/* Need to link to policy and TOS eventually */}
            <a href="#" className="dropdown-menu-links">
              Privacy Policy
            </a>
            &#8226;
            <a href="#" className="dropdown-menu-links">
              Terms of Service
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvatarDropdown;
