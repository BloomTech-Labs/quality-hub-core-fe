import React, { useEffect, useState } from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import * as rtl from "@testing-library/react";
import ApolloClient from "apollo-boost";
import SignInForm from "./SignInForm";
import "@testing-library/jest-dom/extend-expect";
import { Router, NavLink, BrowserRouter } from "react-router-dom";
import { createMemoryHistory } from "history";

beforeEach(rtl.cleanup);
afterEach(rtl.cleanup);
const container = document.body;

test("is rendering", () => {
  const getToken = () => {
    let token = localStorage.getItem("token");
    return token ? `Bearer ${token}` : "";
  };

  const client = new ApolloClient({
    uri: "https://quality-hub-gateway-staging.herokuapp.com/",
    request: operation => {
      operation.setContext({
        headers: {
          Authorization: getToken()
        }
      });
    }
  });

  rtl.render(
    <ApolloProvider client={client}>
      <SignInForm />
    </ApolloProvider>
  );
});

test("form and routing", () => {
  const getToken = () => {
    let token = localStorage.getItem("token");
    return token ? `Bearer ${token}` : "";
  };

  const client = new ApolloClient({
    uri: "https://quality-hub-gateway-staging.herokuapp.com/",
    request: operation => {
      operation.setContext({
        headers: {
          Authorization: getToken()
        }
      });
    }
  });
  const history = createMemoryHistory({ initialEntries: ["/dashboard"] });
  rtl.render(
    <ApolloProvider client={client}>
      <SignInForm />
    </ApolloProvider>
  );

  //fills out the form and clicks Sign in button
  rtl.fireEvent.change(rtl.getByPlaceholderText(container, "Email"), {
    target: { value: "dan@quail.com" }
  });
  rtl.fireEvent.change(rtl.getByPlaceholderText(container, "Password"), {
    target: { value: "danquail" }
  });
  rtl.fireEvent.click(rtl.getByText(container, "Sign in"));
  //make sure the router works
  expect(history.location.pathname).toBe("/dashboard");
  // Forgot password and Sign up links not working yet will add tests for those when they are active
});