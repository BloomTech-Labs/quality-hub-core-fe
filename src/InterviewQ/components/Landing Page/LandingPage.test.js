import React from 'react'
import LandingPage from './LandingPage'
import * as rtl from "@testing-library/react";
import { MockedProvider } from "@apollo/react-testing";
import { Router, NavLink, BrowserRouter } from "react-router-dom";
import { createMemoryHistory } from "history";

afterEach(rtl.cleanup);
afterEach(rtl.cleanup);
const container = document.body;

//get rid of act() warning
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


it('renders w/o crashing', () => {
    const history = createMemoryHistory({ initialEntries: ["/interviewq"] });
    rtl.render(
        <Router history={history}>
            <MockedProvider>
                <LandingPage />
            </MockedProvider>
        </Router>
    )
    
})

it('renders header', () => {
    const history = createMemoryHistory({ initialEntries: ["/interviewq"] });
    rtl.render(
        <Router history={history}>
            <MockedProvider>
                <LandingPage />
            </MockedProvider>
        </Router>
    )
    
    rtl.getAllByText(container, "InterviewQ")
})

it('buttons show', () => {
    const history = createMemoryHistory({ initialEntries: ["/interviewq"] });
    rtl.render(
        <Router history={history}>
            <MockedProvider>
                <LandingPage />
            </MockedProvider>
        </Router>
    )
    
    rtl.getByText(container, "Become a coach")
    rtl.getByText(container, "Filters")
    
})

