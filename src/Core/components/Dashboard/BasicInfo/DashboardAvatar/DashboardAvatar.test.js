import React from 'react';
import { MockedProvider } from '@apollo/react-testing';
import { render } from '@testing-library/react';

// Import component for testing
import DashboardAvatar from './DashboardAvatar';

// Test React components by mocking calls to the GraphQL endpoint; this allows tests to be run in isolation and removes dependence on remote data
it('should render without error', () => {
	render(
		<MockedProvider mocks={[]}>
			<DashboardAvatar />
		</MockedProvider>,
	);
});

it('should display Avatar heading', () => {
	const display = render(
		<MockedProvider mocks={[]}>
			<DashboardAvatar />
		</MockedProvider>,
	);

	expect(display.getByText('Avatar'));
});
