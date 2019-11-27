import React from 'react'
import LandingPage from './LandingPage'
import { render, cleanup } from '@testing-library/react'

afterEach(cleanup)

test('is rendering', () => {
    render(
        <LandingPage />
    )
})

test('p exists and says the right thing', () => {
    const { getByText } = render(<LandingPage />)
    getByText('QualityHub offers the opportunity for anyone to have experienced professionals assess the quality of anything.')
})

