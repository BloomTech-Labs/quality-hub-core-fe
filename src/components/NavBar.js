import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { printIntrospectionSchema } from 'graphql';

const NavBar = ({ loggedin, setLoggedin }) => {

  const logout = () => {
    localStorage.clear();
    setLoggedin(false);
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
        />
      </div>
      <div className="right">
        {loggedin ?
        <NavLink to="/" onClick={logout}>
          Log Out
        </NavLink> :
        <>
        <NavLink to="signin"> Sign In </NavLink>
        <NavLink to="signup"> Sign Up</NavLink> 
        </>}
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
