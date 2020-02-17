import React, { useState } from "react";
import { Route, useLocation } from "react-router-dom";

import "./global/styles/index.scss";
import NavBar from "./global/components/NavBar";
import InterviewQ from "./global/routes/InterviewQ";
import Core from "./global/routes/Core";
import { useAuth0 } from "./global/auth/react-auth0-spa";

import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient, HttpLink, InMemoryCache } from "apollo-boost";
import { setContext } from "apollo-link-context";

function App() {
  let { pathname } = useLocation();

  const [accessToken, setAccessToken] = useState("");

  const { loading, getTokenSilently, isAuthenticated, user } = useAuth0();
  if (loading) {
    return "Loading...";
  }

  // get access token
  const getAccessToken = async () => {
    // getTokenSilently() returns a promise
    try {
      const token = await getTokenSilently();
      setAccessToken(token);
      console.log("Token!!!!!!: ", token);
    } catch (e) {
      console.log(e);
    }
  };
  getAccessToken();

  const httpLink = new HttpLink({
    uri: "https://quality-hub-core-staging.herokuapp.com"
  });

  const authLink = setContext((_, { headers }) => {
    const token = accessToken;
    if (token) {
      return {
        headers: {
          ...headers,
          authorization: `Bearer ${token}`
        }
      };
    } else {
      return {
        headers: {
          ...headers
        }
      };
    }
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });

  console.log("LOGIN COUNT FROM APP.JS", localStorage.getItem("loginCount"));
  const loginCount = localStorage.getItem("loginCount");

  if (loginCount === "1") {
    //GO HERE ON SIGN UP
    console.log("REDIRECTING FROM AUTH0 SIGN UP");
    if (window.location.pathname !== "/signup") {
      window.location.pathname = "/signup";
    }
  } else {
    console.log("NOT REDIRECTING");
  }

  return (
    <ApolloProvider client={client}>
      <div className="App">
        {!pathname.includes("/meeting") && (
          <Route path="/" render={props => <NavBar {...props} />} />
        )}
        <div className="not-nav">
          <Core />
          <InterviewQ />
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
