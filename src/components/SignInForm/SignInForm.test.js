import React, { useEffect, useState } from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import * as rtl from "@testing-library/react";
import ApolloClient from "apollo-boost";
import SignInForm from "./SignInForm";
import "@testing-library/jest-dom/extend-expect";

beforeEach(rtl.cleanup);
afterEach(rtl.cleanup);
const container = document.body;

// const originalError = console.error;
// beforeAll(() => {
//   console.error = (...args) => {
//     if (/Warning.*not wrapped in act/.test(args[0])) {
//       return;
//     }
//     // originalError.call(console, ...args)
//   };
// });

// afterAll(() => {
//   console.error = originalError;
// });

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
