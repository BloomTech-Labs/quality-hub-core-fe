import React from 'react'
import LandingPage from './LandingPage'
import * as rtl from "@testing-library/react";
import { MockedProvider } from "@apollo/react-testing";
import { Router, NavLink, BrowserRouter } from "react-router-dom";
import { createMemoryHistory } from "history";

afterEach(rtl.cleanup)

it('renders w/o crashing', () => {
    const history = createMemoryHistory({ initialEntries: ["/"] });
    rtl.render(
        <Router history={history}>
            <MockedProvider>
                <LandingPage />
            </MockedProvider>
        </Router>
    )
})

