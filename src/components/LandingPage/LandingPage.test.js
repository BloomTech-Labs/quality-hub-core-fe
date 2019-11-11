import React from 'react'
import LandingPage from './LandingPage'
import { render, cleanup } from '@testing-library/react'

afterEach(cleanup)

test('is rendering', () => {
    render(
        <LandingPage />
    )
})

test('h1 exists and says the right thing', () => {
    const { getByText } = render(<LandingPage />)
    getByText('The best way to assess the quality of skill.')
})

