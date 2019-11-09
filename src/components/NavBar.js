import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { printIntrospectionSchema } from "graphql";

const NavBar = ({ loggedin, setLoggedin }) => {
  const logout = () => {
    localStorage.clear();
    setLoggedin(false);
  };

  const toggleDropdown = () => {
    console.log("toggling dropdown");
    document.querySelector(".dropdown-content").classList.toggle("hidden");
  };

  return (
    <StyledNav>
      <div className="left">
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

        <div className="dropdown">
          <img
            src="/avatar.png"
            alt="Profile avatar"
            className="avatar-menu"
            onClick={() => toggleDropdown()}
          />
          <div className="dropdown-content hidden">
            <div className="dropdown-avatar-camera">
              <img
                src="/avatar.png"
                alt="Profile avatar"
                className="avatar-submenu"
              />
              <div className="dropdown-camera-icon">&#x1F4F7;</div>
            </div>
            <p className="dropdown-menu-name">Quailnana</p>
            <p className="dropdown-menu-email">quailnana@qualityhub.com</p>

            <button className="manage-btn">
              Manage your Quality Hub account
            </button>
            <hr />
            <button className="signout-btn">Sign Out </button>
            <hr />
            <div className="dropdown-menu-links-div">
            <a href="#" className="dropdown-menu-links">Privacy Policy</a>&#8226;<a href="#" className="dropdown-menu-links">Terms of Service</a>
            </div>
          </div>
        </div>
        {/* <NavLink to='dashboard'> Dashboard</NavLink> */}
        {/* <p> dropdown menu?</p> */}
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
