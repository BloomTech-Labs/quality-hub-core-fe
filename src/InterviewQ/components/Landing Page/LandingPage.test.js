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

async function wait(ms = 0) {
  await rtl.act(() => {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  });
} 

it('renders w/o crashing', async () => {
    const history = createMemoryHistory({ initialEntries: ["/interviewq"] });
    rtl.render(
        <Router history={history}>
            <MockedProvider>
                <LandingPage />
            </MockedProvider>
        </Router>
    ) 
    await wait();
})

it('renders header', async () => {
    const history = createMemoryHistory({ initialEntries: ["/interviewq"] });
    rtl.render(
        <Router history={history}>
            <MockedProvider>
                <LandingPage />
            </MockedProvider>
        </Router>
    )
    await wait();
    rtl.getAllByText(container, "InterviewQ")
})

it('buttons show', async () => {
    const history = createMemoryHistory({ initialEntries: ["/interviewq"] });
    rtl.render(
        <Router history={history}>
            <MockedProvider>
                <LandingPage />
            </MockedProvider>
        </Router>
    )
    await wait();
    rtl.getByText(container, "Become a coach")
    rtl.getByText(container, "Filters")
})

it('filter works', async () => {
    const history = createMemoryHistory({ initialEntries: ["/interviewq"] });
    rtl.render(
        <Router history={history}>
            <MockedProvider>
                <LandingPage />
            </MockedProvider>
        </Router>
    )
    await wait();
    rtl.fireEvent.click(rtl.getByText(container, "Filters"))
})