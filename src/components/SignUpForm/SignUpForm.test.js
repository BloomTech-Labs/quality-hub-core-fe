import React, { useEffect, useState } from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import * as rtl from "@testing-library/react";
import ApolloClient from "apollo-boost";
import SignUpForm from "./SignUpForm";
import GeneralSignUp from "./GeneralSignUp";
import ExpSignUp from "./ExpSignUp";
import "@testing-library/jest-dom/extend-expect";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

beforeEach(rtl.cleanup);
afterEach(rtl.cleanup);
const container = document.body;

const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return;
    }
    // originalError.call(console, ...args)
  };
});

afterAll(() => {
  console.error = originalError;
});

async function wait(ms = 0) {
  await rtl.act(() => {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  });
}

test("is rendering", async () => {
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
      <SignUpForm />
    </ApolloProvider>
  );
  await wait();
});

test("form", async () => {
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
      <SignUpForm />
    </ApolloProvider>
  );

  //fill out the form
  rtl.fireEvent.change(rtl.getByPlaceholderText(container, "First Name"), {
    target: { value: "chuck" }
  });
  rtl.fireEvent.change(rtl.getByPlaceholderText(container, "Last Name"), {
    target: { value: "norris" }
  });
  rtl.fireEvent.change(rtl.getByLabelText(container, "Password*"), {
    target: { value: "chuck" }
  });
  rtl.fireEvent.change(rtl.getByLabelText(container, "Email*"), {
    target: { value: "chuck@quail.com" }
  });
  rtl.fireEvent.click(rtl.getByPlaceholderText(container, "Industry"), {
    target: { value: "Healthcare" }
  });

  rtl.fireEvent.change(rtl.getByLabelText(container, "City*"), {
    target: { value: "Toledo" }
  });
  rtl.fireEvent.change(rtl.getByLabelText(container, "State/Territory*"), {
    target: { value: "OH" }
  });

  rtl.fireEvent.click(rtl.getByText(container, "Next"));

  rtl.fireEvent.change(rtl.getByLabelText(container, "LinkedIn"), {
    target: { value: "https://www.linkedin.com/in/chuck-norris-90123b179/" }
  });

  rtl.fireEvent.click(rtl.getByText(container, "Submit"));
});
