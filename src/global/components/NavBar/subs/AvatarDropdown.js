// Libraries
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { gql } from "apollo-boost";
import { useLazyQuery } from "@apollo/react-hooks";
import { Gear } from "../../../icons/gear";
import { Signout } from "../../../icons/signout";

// Icons
import { blankavatar } from "../../../icons/blankavatar";

// Queries
const GET_USER = gql`
  query dropdownMenu {
    me {
      id
      first_name
      last_name
      email
      image_url
    }
  }
`;

const AvatarDropdown = props => {
  const [getUser, { client, data }] = useLazyQuery(GET_USER);

  const [open, setOpen] = useState(false);

  const [profileInfo, setProfileInfo] = useState([JSON.parse(localStorage.getItem('userInfo')) !== null ? JSON.parse(localStorage.getItem('userInfo')) : { picture: 'https://i.stack.imgur.com/l60Hf.png' }]);



  const node = useRef();

  const setUserPicture = () => {
    if (profileInfo.picture !== JSON.parse(localStorage.getItem(('userInfo'))).picture) {
      console.log('we are not the same');
      return setTimeout(
        () => {
          setProfileInfo((JSON.parse(localStorage.getItem(('userInfo')))))
        }, 1500)
    }
  };

  const logout = () => {
    client.clearStore(); //remove token from cache
    document.removeEventListener("mousedown", handleOutsideClick);
    setOpen(false);

    props.logout();
    // auth.logout();
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
    getUser();
    //setUserPicture();
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
      <div
        style={{
          backgroundImage: `url('${data && profileInfo.picture}')`
        }}
        className="avatar-menu"
        onClick={e => setOpen(!open)}
      >
        {data && !profileInfo.picture && blankavatar()}
      </div>
      {open && (
        <div className="dropdown-content">
          <div className="dropdown-avatar-camera">
            <label htmlFor="imageInput-2">
              <div className="img-wrapper-dropdown">
                {data ? ( //ternary 1
                  profileInfo.picture ? ( //ternary 2
                    <div
                      className="profile-img-dropdown"
                      style={{
                        backgroundImage: `url('${profileInfo.picture}')`
                      }}
                    ></div> //ternary 2
                  ) : (
                      <div className="profile-img-dropdown2">
                        {profileInfo}
                      </div>
                    ) //ternary 1
                ) : (
                    <div className="profile-img-dropdown3">
                      {profileInfo}
                    </div>
                  )}
              </div>
            </label>
          </div>
          {data && (
            <p className="dropdown-menu-name">
              {data.me.first_name + " " + data.me.last_name}
            </p>
          )}
          {data && <p className="dropdown-menu-email">{data.me.email}</p>}
          <hr className="hr-below-email" />
          <div className="avatar-dropdown-dashboard-link">
            <Link to="/dashboard" onClick={() => setOpen(false)}>
              <div className="avatar-dropdown-lower-icons">{Gear()}</div>{" "}
              <div>QualityHub Account</div>
            </Link>
          </div>
          <hr />
          <div className="avatar-dropdown-signout-link">
            <Link to="/" onClick={() => logout()}>
              <div className="avatar-dropdown-lower-icons">{Signout()}</div>{" "}
              <div>Sign Out</div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvatarDropdown;
