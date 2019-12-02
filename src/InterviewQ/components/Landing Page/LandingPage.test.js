import React from 'react'
import LandingPage from './LandingPage'
import * as rtl from "@testing-library/react";
import { MockedProvider } from "@apollo/react-testing";
import { Router, NavLink, BrowserRouter } from "react-router-dom";
import { createMemoryHistory } from "history";

afterEach(rtl.cleanup)

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

