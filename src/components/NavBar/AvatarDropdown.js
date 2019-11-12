import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { gql } from 'apollo-boost';
import { useLazyQuery, useQuery } from '@apollo/react-hooks';
// import {ApolloConsumer} from '@apollo/react-hooks';





// const resetStore = () =>(
//   <ApolloConsumer>
//     {client=>{
//       client.clearStore();
//     }}
//   </ApolloConsumer>
// );



const GET_USER = gql`
  query dropdownMenu{
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

const AvatarDropdown = props => {
  const [getUser, {called, loading, data}] = useLazyQuery(GET_USER);
  // const {userData} = useQuery(GET_USER);
  const node = useRef();
  const [open, setOpen] = useState(false);
  // const [editUser, setEditUser] = useState(userData);

  const logout = () => {
    document.removeEventListener("mousedown", handleOutsideClick);
    setOpen(false);
    // resetStore();
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

  useEffect(()=>{
    getUser();
  },[])

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    getUser();
    // setEditUser(userData);
  }, [open]);

  // useEffect(() => {
    
  // }, [userData]);

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
            {/* Avatar image in dropdown menu */}
            <img
              src={data.me.image_url || "avatar.png" }
              alt="Profile avatar"
              className="avatar-submenu"
            />
            {/* This is the offset camera icon */}
            <div className="dropdown-camera-icon">&#x1F4F7;</div>
          </div>
          {data && <p className="dropdown-menu-name">{data.me.first_name + " " + data.me.last_name}</p>}
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
