import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
// import { printIntrospectionSchema } from "graphql";
import AvatarDropdown from "./AvatarDropdown";
import GridDropdown from "./GridDropdown";


const NavBar = ({ loggedin, setLoggedin }) => {
  const logout = () => {
    localStorage.clear();
    setLoggedin(false);
  };

  useEffect(()=>{
    if(localStorage.getItem('token')){
      setLoggedin(true);
    }
  },[])

  return (
    <StyledNav>
      {/* Animated bird flying across the screen */}
      <div className="left">
        <div className="bird"></div>
        <NavLink to="/">
          <h2>QualityHub</h2>
        </NavLink>
        <img
          src="http://clipartmag.com/images/quail-clipart-1.jpg"
          alt="quail"
          className="rotate"
        />
      </div>
      {/* End animated bird */}

      <div className="right">
        {!loggedin && (
          <>
            <NavLink to="signin"> Sign In </NavLink>
            <NavLink to="signup"> Sign Up</NavLink>
          </>
        )}

        <GridDropdown />
        {loggedin &&
        <AvatarDropdown logout={logout} loggedin={loggedin} className="hidden"/>}
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
