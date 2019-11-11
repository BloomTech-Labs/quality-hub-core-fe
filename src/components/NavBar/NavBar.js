import React, {useEffect, useRef, useState} from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { printIntrospectionSchema } from "graphql";
import AvatarDropdown from './AvatarDropdown';
import GridDropdown from './GridDropdown';

const NavBar = ({ loggedin, setLoggedin }) => {
  const logout = () => {
    localStorage.clear();
    setLoggedin(false);
  };

  const toggleDropdown = () => {
    document.querySelector(".dropdown-content").classList.toggle("hidden");
  };

  // const toggleGridDropdown = () => {
  //   document.querySelector(".dropdown-grid-content").classList.toggle("hidden");
  // };

  return (
    <StyledNav>
      <div className="left">
        <div className="bird"></div>
        {/* <div class="pirate"></div> */}
        <NavLink to="/">
          <h2>QualityHub</h2>
        </NavLink>
        <img
          src="http://clipartmag.com/images/quail-clipart-1.jpg"
          alt="quail"
          className="rotate"
        />
      </div>
      <div className="right">
        {loggedin ? (
          <NavLink to="/" onClick={logout}>
            Log Out
          </NavLink>
        ) : (
          <>
            <NavLink to="signin"> Sign In </NavLink>
            <NavLink to="signup"> Sign Up</NavLink>
          </>
        )}

        <GridDropdown />
        


        <div className="dropdown">
          {/* Main avatar image you see on top right */}
          <img
            src="/avatar.png"
            alt="Profile avatar"
            className="avatar-menu"
            onClick={() => toggleDropdown()}
          />
          {/* This is the content at appears when you click on the avatar image */}
          <div className="dropdown-content hidden">
            <div className="dropdown-avatar-camera">
              {/* Avatar image in dropdown menu */}
              <img
                src="/avatar.png"
                alt="Profile avatar"
                className="avatar-submenu"
              />
              {/* This is the offset camera icon */}
              <div className="dropdown-camera-icon">&#x1F4F7;</div>
            </div>
            <p className="dropdown-menu-name">Quailnana</p>
            <p className="dropdown-menu-email">quailnana@qualityhub.com</p>

            {/* Need to link to dashboard */}
            <button className="manage-btn">
              Manage your Quality Hub account
            </button>
            <hr />
            {/* Need to add sign out functionality */}
            <button className="signout-btn">Sign Out </button>
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
        </div>
      </div>
    </StyledNav>
  );
};

const StyledNav = styled.div`
  //   background-color: red;
  display: flex;
  justify-content: space-between;

  .left {
    display: flex;
    padding-left: 2%;

    a {
      color: black;
      text-decoration: none;
    }

    img {
      width: 5rem;
    }
  }
  .right {
    display: flex;
    justify-content: space-evenly;
    width: 180px;
    align-items: center;

    a {
      color: black;
      text-decoration: none;
      font-weight: bold;
      width: 80px;
    }
  }
`;

export default NavBar;
