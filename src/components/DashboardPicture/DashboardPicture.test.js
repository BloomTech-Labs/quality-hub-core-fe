import React from 'react';
import { MockedProvider } from '@apollo/react-testing';
import { render } from '@testing-library/react';

// Import component for testing
import DashboardPicture from './DashboardPicture';

// Test React components by mocking calls to the GraphQL endpoint; this allows tests to be run in isolation and removes dependence on remote data
it('should render without error', () => {
	render(
		<MockedProvider mocks={[]}>
			<DashboardPicture />
		</MockedProvider>,
	);
});

it('should display Avatar heading', () => {
	const display = render(
		<MockedProvider mocks={[]}>
			<DashboardPicture />
		</MockedProvider>,
	);

	expect(display.getByText('Avatar'));
});
