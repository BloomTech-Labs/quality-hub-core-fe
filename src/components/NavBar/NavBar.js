import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import AvatarDropdown from "./AvatarDropdown";
import GridDropdown from "./GridDropdown";
import { useLazyQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import {Redirect} from 'react-router-dom';

const GET_USER = gql`
  query dropdownMenu {
    me {
      id
    }
  }
`;

const NavBar = ({ loggedin, setLoggedin, history }) => {
  const [getUser, { client, error, data }] = useLazyQuery(GET_USER);
  const [errorCount, setErrorCount] = useState(0);

  const logout = () => {
    // if(client){client.clearStore();}
    localStorage.clear();
    setLoggedin(false);
    history.push('/');
    // return <Redirect to="/" />
  };

  // On render, pull stored token. If you have a token, log yourself in.
  useEffect(() => {
    //if you have a token, pull some user data to make sure it's valid
    if (localStorage.getItem("token")) {
      getUser();
    }
  }, []);


  if (data && localStorage.getItem('token')) {
    console.log('here');
    setLoggedin(true);
    
  }

  if (error && errorCount == 0) {
    setErrorCount(1);
    client.clearStore();
    setLoggedin(false);
    logout();
  }
console.log(loggedin);
  return (
    <StyledNav>
      {/* Animated quailnana flying across the screen */}
      <div className="left">
        <div className="bird"></div>
        <NavLink to="/">
          <h2>QualityHub</h2>
        </NavLink>
        {/* Spinning Quail */}
        <img
          src="http://clipartmag.com/images/quail-clipart-1.jpg"
          alt="quail"
          className="rotate"
        />
      </div>
      {/* End animated quailnana */}

      <div className="right">
        {/* If you're not logged in, show sign in and sign up buttons */}
        {!loggedin && (
          <>
            <NavLink to="signin"> Sign In </NavLink>
            <NavLink to="signup"> Sign Up</NavLink>
          </>
        )}

        {/* Dropdown list of Q services */}
        <GridDropdown />

        {/* If you're logged in, show your avatar with a dropdown menu */}
        {loggedin && (
          <AvatarDropdown
            logout={logout}
            loggedin={loggedin}
            setLoggedin={setLoggedin}
            className="hidden"
            history={history}
          />
        )}
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
