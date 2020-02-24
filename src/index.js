import React, { useState } from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";

import "./index.scss";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

import { Auth0Provider } from "./global/auth/react-auth0-spa";
import { StripeProvider } from "react-stripe-elements";
import { set } from "date-fns";

require("dotenv").config();

const stripeKey = process.env.REACT_APP_STRIPE_KEY || "stripe";

const onRedirectCallback = appState => {
  createBrowserHistory().push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

ReactDOM.render(
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH0_DOMAIN}
    client_id={process.env.REACT_APP_CLIENT_ID}
    redirect_uri="http://qhubfe.herokuapp.com/callback"
    onRedirectCallback={onRedirectCallback}
    redirectUri="http://qhubfe.herokuapp.com/callback"
    audience={process.env.AUDIENCE}
    responseType="token id_token"
    scope="openid email"
  >
    <StripeProvider apiKey={stripeKey}>
      <Router>
        <App />
      </Router>
    </StripeProvider>
  </Auth0Provider>,

  document.getElementById("root")
);
