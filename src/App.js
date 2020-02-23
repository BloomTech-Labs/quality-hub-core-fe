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

import jwt from "jsonwebtoken";

function App() {
  let { pathname } = useLocation();

  const [accessToken, setAccessToken] = useState("");

  // const [completedRegister, setCompletedRegister] = useState(false);

  const { loading, getTokenSilently, isAuthenticated, user } = useAuth0();
  if (loading) {
    return "Loading...";
  }

  // get access token
  const getAccessToken = async () => {
    // getTokenSilently() returns a promise
    try {
      const token = await getTokenSilently();
      const decoded = jwt.decode(token);
      // console.log("decoded token: ", decoded);
      localStorage.setItem("loginCount", decoded["http://logins"]);
      localStorage.setItem("email", decoded["http://email"]);
      localStorage.setItem("authId", decoded.sub);

      setAccessToken(token);
      console.log("Token!!!!!!: ", token);
    } catch (e) {
      console.log(e);
    }
  };

  if (isAuthenticated) {
    getAccessToken();
  }

  const httpLink = new HttpLink({
    uri: "https://qhubgateway.herokuapp.com/"
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

  // console.log("LOGIN COUNT FROM APP.JS", localStorage.getItem("loginCount"));
  const loginCount = localStorage.getItem("loginCount");
  const completedRegister = localStorage.getItem("completedRegister");

  if (loginCount === "1" && completedRegister !== "1") {
    //GO HERE ON SIGN UP
    // console.log("REDIRECTING FROM AUTH0 SIGN UP");
    if (window.location.pathname !== "/signup") {
      window.location.pathname = "/signup";
    }
  } else {
    // console.log("NOT REDIRECTING");
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
