// Libraries
import React from "react";

import { useAuth0 } from "../../../../global/auth/react-auth0-spa";

// Components
import AvatarDropdown from "../../../../global/components/NavBar/subs/AvatarDropdown";
import GridDropdown from "../../../../global/components/NavBar/subs/GridDropdown";

import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const INFO_QUERY = gql`
  {
    info
  }
`;

export default function NavBar({ loggedin, setLoggedin, history }) {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const { loading, error, data } = useQuery(INFO_QUERY);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <div className="landing-page-nav">
      <h1>{data.info}</h1>
      <h1>QualityHub</h1>
      <div className="landing-page-nav-right">
        <a
          className="landing-page-nav-link landing-page-nav-about"
          href="#about"
        >
          About
        </a>
        <a
          className="landing-page-nav-link landing-page-nav-link"
          href="#services"
        >
          Services
        </a>

        {!isAuthenticated && (
          <a
            className="landing-page-nav-link landing-page-nav-signin"
            onClick={() => loginWithRedirect({})}
          >
            Log in
          </a>
        )}

        {isAuthenticated && (
          <a
            className="landing-page-nav-link landing-page-nav-signin"
            onClick={() => logout()}
          >
            Log Out
          </a>
        )}

        <div className="landing-page-nav-grid-dropdown">
          <GridDropdown />
        </div>

        {isAuthenticated && (
          <div className="landing-page-nav-avatar">
            <AvatarDropdown
              logout={logout}
              loggedin={loggedin}
              setLoggedin={setLoggedin}
              history={history}
            />
          </div>
        )}
      </div>
    </div>
  );
}
